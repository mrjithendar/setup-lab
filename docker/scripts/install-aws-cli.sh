#!/usr/bin/env bash
# Called after the common dependency installer provides Python and venv support.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
if command -v aws >/dev/null 2>&1; then
  echo 'AWS CLI is already installed; keeping the existing installation.'
  aws --version
  exit 0
fi
# sudo may omit /usr/local/bin from PATH; preserve an installation there too.
if [[ -x /usr/local/bin/aws ]]; then
  /usr/local/bin/aws --version
  exit 0
fi
if [[ -e /usr/local/bin/aws || -L /usr/local/bin/aws ]]; then
  echo '/usr/local/bin/aws exists but is not executable; repair it before rerunning.' >&2
  exit 1
fi
# Separate environment avoids dependency conflicts with WordPress's boto3 SDK.
python3 -m venv /opt/wordpress-aws-cli
/opt/wordpress-aws-cli/bin/python -m pip install --disable-pip-version-check 'awscli>=1.32,<2'
/opt/wordpress-aws-cli/bin/aws --version
install -d -m 0755 /usr/local/bin
ln -s /opt/wordpress-aws-cli/bin/aws /usr/local/bin/aws
echo 'AWS CLI installed at /usr/local/bin/aws.'
