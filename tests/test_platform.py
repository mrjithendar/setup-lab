from pathlib import Path
import json
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]

class PlatformTests(unittest.TestCase):
    def test_routes(self):
        for distro, version, route in [('amzn','2023','amazon'), ('centos','9','rpm'), ('centos','10','rpm'), ('rhel','9.6','rpm'), ('rocky','10.0','rpm'), ('almalinux','9.5','rpm'), ('fedora','43','rpm'), ('ubuntu','24.04','apt'), ('debian','13','apt')]:
            with self.subTest(distro=distro, version=version):
                result = subprocess.run(['bash','-c','source "$1"; select_platform "$2" "$3"', 'test', str(ROOT/'scripts/platform.sh'), distro, version], capture_output=True, text=True)
                self.assertEqual(result.returncode, 0)
                self.assertEqual(result.stdout.strip(), route)

    def test_unsupported(self):
        for distro, version in [('centos','7'), ('centos','8'), ('alpine','3.22'), ('amzn','2')]:
            result = subprocess.run(['bash','-c','source "$1"; select_platform "$2" "$3"', 'test', str(ROOT/'scripts/platform.sh'), distro, version], capture_output=True)
            self.assertNotEqual(result.returncode, 0)

    def test_configuration_recovery_and_migration_guard(self):
        script = (ROOT/'install.sh').read_text().split("<<'PYTHON'\n",1)[1].split('\nPYTHON',1)[0]
        with tempfile.TemporaryDirectory() as directory:
            wp = Path(directory)/'wp'
            wp.mkdir()
            (wp/'config.json.template').write_text((ROOT/'wp/config.json.template').read_text())
            def run(domain='example.com', admin='first'):
                return subprocess.run(['python3','-c',script,domain,'us-east-1','test@example.com',admin], cwd=directory, capture_output=True, text=True)
            self.assertEqual(run().returncode, 0)
            self.assertEqual(run(admin='second').returncode, 0)
            (wp/'db').mkdir()
            (wp/'db/data').touch()
            self.assertEqual(run(admin='third').returncode, 0)
            self.assertNotEqual(run(domain='other.example.com').returncode, 0)
            self.assertEqual(json.loads((wp/'config.json').read_text())['DOMAIN'], 'example.com')

if __name__ == '__main__': unittest.main()
