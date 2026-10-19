import importlib.util
import json
import os
import shlex
import sys
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('config', ROOT / 'wp/configure-secret.py')
config = importlib.util.module_from_spec(spec)
spec.loader.exec_module(config)

class Missing(Exception): pass
class Exists(Exception): pass

class SecretTests(unittest.TestCase):
    def client(self):
        client = Mock()
        client.exceptions.ResourceNotFoundException = Missing
        client.exceptions.ResourceExistsException = Exists
        return client

    def test_existing(self):
        client = self.client()
        client.get_secret_value.return_value = {'SecretString': '{"password":"existing$secret"}'}
        self.assertEqual(config.fetch_password(client, 'example.org'), 'existing$secret')
        client.create_secret.assert_not_called()
        client.get_secret_value.assert_called_once_with(SecretId='example.org')

    def test_missing(self):
        client = self.client()
        client.get_secret_value.side_effect = [Missing(), {'SecretString': 'created'}]
        self.assertEqual(config.fetch_password(client, 'example.org'), 'created')
        args = client.create_secret.call_args.kwargs
        self.assertEqual(args['Name'], 'example.org')
        self.assertRegex(args['SecretString'], r'^[0-9a-f]{64}$')

    def test_creation_race(self):
        client = self.client()
        client.get_secret_value.side_effect = [Missing(), {'SecretString': 'winner'}]
        client.create_secret.side_effect = Exists()
        self.assertEqual(config.fetch_password(client, 'example.org'), 'winner')

    def test_access_error_does_not_create(self):
        client = self.client()
        client.get_secret_value.side_effect = PermissionError('denied')
        with self.assertRaises(PermissionError): config.fetch_password(client, 'example.org')
        client.create_secret.assert_not_called()

    def test_invalid(self):
        for value in ['', '{}', '[]', 'null', '"bad\\nvalue"']:
            with self.assertRaises(ValueError): config.password_from(value)

    def run_main(self, root, client, initialize=False):
        sdk = Mock()
        sdk.client.return_value = client
        args = ['configure-secret.py'] + (['--initialize'] if initialize else []) + ['--', 'echo', 'ready']
        with patch.dict(sys.modules, {'boto3': sdk}), patch.object(config, '__file__', str(root / 'configure-secret.py')), patch.object(sys, 'argv', args), patch.object(os, 'execvpe') as execute:
            config.main()
            return execute

    def prepare(self, root):
        settings = json.loads((ROOT / 'wp/config.json.template').read_text())
        settings['DOMAIN'] = 'example.org'
        (root / 'config.json').write_text(json.dumps(settings))
        return settings

    def test_existing_database_rejected_without_marker(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.prepare(root)
            (root / 'db').mkdir()
            (root / 'db/data').touch()
            client = self.client()
            with self.assertRaises(SystemExit): self.run_main(root, client, True)
            client.get_secret_value.assert_not_called()

    def test_environment_injection_without_password_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.prepare(root)
            client = self.client()
            password = 'a$HOME ${FOO} $$ # "quotes" \ slash !'
            client.get_secret_value.return_value = {'SecretString': password}
            execute = self.run_main(root, client, True)
            client.get_secret_value.assert_called_once_with(SecretId='jithendar')
            self.assertEqual(execute.call_args.args[2]['SHARED_PASSWORD'], password)
            self.assertEqual(execute.call_args.args[:2], ('echo', ['echo', 'ready']))
            self.assertFalse((root / '.env').exists())
            for file in root.iterdir():
                self.assertNotIn(password, file.read_text())
            client.create_secret.assert_not_called()

    def test_changed_secret_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.prepare(root)
            (root / '.credential-fingerprint').write_text('previous')
            client = self.client()
            client.get_secret_value.return_value = {'SecretString': 'changed'}
            with self.assertRaises(SystemExit): self.run_main(root, client)

    def test_runtime_does_not_create_missing_secret(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.prepare(root)
            client = self.client()
            client.get_secret_value.side_effect = Missing()
            with self.assertRaises(Missing): self.run_main(root, client)
            client.create_secret.assert_not_called()

    def test_compose_password_roundtrip(self):
        command = shlex.split(os.environ.get('COMPOSE_COMMAND', 'docker compose'))
        if subprocess.run(command + ['version'], capture_output=True).returncode:
            self.skipTest('Docker Compose is not available')
        password = 'a$HOME ${FOO} $$ # "quotes" \ slash !'
        env = os.environ.copy()
        env.update(json.loads((ROOT / 'wp/config.json.template').read_text()))
        env['DOMAIN'] = 'example.org'
        env['SHARED_PASSWORD'] = password
        result = subprocess.run(command + ['--env-file', '/dev/null', '-f',
            str(ROOT / 'wp/docker-compose.yaml'), 'config', '--format', 'json'],
            env=env, capture_output=True, text=True, check=True)
        services = json.loads(result.stdout)['services']
        self.assertEqual(services['db']['environment']['MYSQL_PASSWORD'], password)
        self.assertEqual(services['db']['environment']['MYSQL_ROOT_PASSWORD'], password)
        self.assertEqual(services['wordpress']['environment']['SHARED_PASSWORD'], password)
        self.assertEqual(services['redis']['environment']['REDIS_PASSWORD'], password)

if __name__ == '__main__': unittest.main()
