#!/usr/bin/env bash
# Orchestration only; each stage also runs independently.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
domain=${1:?Usage: sudo bash install.sh DOMAIN AWS_REGION EMAIL [ADMIN_USER]}
region=${2:?Supply the AWS region}
email=${3:?Supply your certificate and WordPress administrator email}
admin=${4:-siteadmin}
cd "$(dirname "$0")"
exec 9>/run/lock/wordpress-install.lock
flock -n 9 || { echo 'Another installation is running.' >&2; exit 1; }
python3 - "$domain" "$region" "$email" "$admin" <<'PYTHON'
import json, pathlib, sys, re
root = pathlib.Path('wp')
config = json.loads((root / 'config.json.template').read_text())
domain = sys.argv[1].lower()
if len(domain) > 253 or '.' not in domain or any(not re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?', label) for label in domain.split('.')):
    raise SystemExit('Supply a DNS hostname without a scheme, port or path.')
config.update(DOMAIN=domain, AWS_REGION=sys.argv[2], WORDPRESS_ADMIN_EMAIL=sys.argv[3], WORDPRESS_ADMIN_USER=sys.argv[4])
if '@' not in sys.argv[3] or not sys.argv[4]:
    raise SystemExit('Supply a valid email and administrator name.')
target = root / 'config.json'
target.unlink(missing_ok=True)
target.write_text(json.dumps(config, indent=2) + '\n')
PYTHON
bash install-docker-ec2.sh
python3 -m venv .venv
.venv/bin/pip install --disable-pip-version-check -r requirements.txt
exec .venv/bin/python wp/configure-secret.py --initialize -- bash wp/deploy.sh
