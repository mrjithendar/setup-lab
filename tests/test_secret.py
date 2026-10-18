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
        self.assertEqual(config.fetch_password(client), 'existing$secret')
        client.create_secret.assert_not_called()

    def test_missing(self):
        client = self.client()
        client.get_secret_value.side_effect = [Missing(), {'SecretString': 'created'}]
        self.assertEqual(config.fetch_password(client), 'created')
        args = client.create_secret.call_args.kwargs
        self.assertEqual(args['Name'], 'jithendar.com')
        self.assertRegex(args['SecretString'], r'^[0-9a-f]{64}$')

    def test_creation_race(self):
        client = self.client()
        client.get_secret_value.side_effect = [Missing(), {'SecretString': 'winner'}]
        client.create_secret.side_effect = Exists()
        self.assertEqual(config.fetch_password(client), 'winner')

    def test_access_error_does_not_create(self):
        client = self.client()
        client.get_secret_value.side_effect = PermissionError('denied')
        with self.assertRaises(PermissionError): config.fetch_password(client)
        client.create_secret.assert_not_called()

    def test_invalid(self):
        for value in ['', '{}', '[]', 'null', '"bad\\nvalue"']:
            with self.assertRaises(ValueError): config.password_from(value)

    def test_existing_database_env_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'db').mkdir()
            (root / 'db/data').touch()
            (root / '.env').write_text('MYSQL_PASSWORD=legacy\n')
            sdk = Mock()
            with patch.dict(sys.modules, {'boto3': sdk}), patch.object(config, '__file__', str(root / 'configure-secret.py')), patch.object(sys, 'argv', ['configure-secret.py', '--region', 'ap-south-1', '--email', 'test@example.com']):
                with self.assertRaises(SystemExit): config.main()
            self.assertEqual((root / '.env').read_text(), 'MYSQL_PASSWORD=legacy\n')
            sdk.client.return_value.get_secret_value.assert_not_called()

    def test_compose_password_roundtrip(self):
        command = shlex.split(os.environ.get('COMPOSE_COMMAND', 'docker compose'))
        if subprocess.run(command + ['version'], capture_output=True).returncode:
            self.skipTest('Docker Compose is not available')
        password = 'a$HOME ${FOO} $$ # "quotes" \'single\' \\ slash !'
        with tempfile.TemporaryDirectory() as directory:
            env = Path(directory) / '.env'
            env.write_text(config.render(password, 'test@example.com', 'siteadmin'))
            result = subprocess.run(shlex.split(os.environ.get('COMPOSE_COMMAND', 'docker compose')) + ['--env-file', str(env), '-f',
                str(ROOT / 'wp/docker-compose.yaml'), 'config', '--format', 'json'],
                capture_output=True, text=True, check=True)
            services = json.loads(result.stdout)['services']
            self.assertEqual(services['db']['environment']['MYSQL_PASSWORD'], password)
            self.assertEqual(services['db']['environment']['MYSQL_ROOT_PASSWORD'], password)
            self.assertEqual(services['wordpress']['environment']['SHARED_PASSWORD'], password)
            self.assertEqual(services['redis']['environment']['REDIS_PASSWORD'], password)

if __name__ == '__main__': unittest.main()
