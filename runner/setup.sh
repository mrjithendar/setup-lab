#!/usr/bin/env bash
set +x
set -euo pipefail
umask 077

[[ $(uname -s) == Linux ]] || { echo 'This installer requires Linux.' >&2; exit 1; }

[[ $EUID != 0 ]] || { echo 'Run as ec2-user (without sudo); the script uses sudo only for dependencies and service setup.' >&2; exit 1; }

for command in aws python3 curl tar sha256sum flock sudo; do
  command -v "$command" >/dev/null || { echo "Missing prerequisite: $command" >&2; exit 1; }
done

script_dir=$(cd -- "$(dirname -- "$0")" && pwd -P)
runner_dir=${RUNNER_DIR:-"$HOME/actions-runner"}
mkdir -p -- "$runner_dir" || {
  echo 'Cannot create runner directory. Set RUNNER_DIR to a directory writable by your user.' >&2
  exit 1
}
[[ -w "$runner_dir" ]] || { echo "Runner directory is not writable: $runner_dir" >&2; exit 1; }
cd -- "$runner_dir"
exec 9>.setup.lock
flock -n 9 || { echo 'Another runner installation is running.' >&2; exit 1; }

repo=mrjithendar/roboshop-ai

if [[ ! -f .runner ]]; then
  case $(uname -m) in
    x86_64) arch=x64; checksum=70920811a4f8ad4328818682bca5c6469c1c942fab52448868071d0063816613;;
    aarch64|arm64) arch=arm64; checksum=9b1dc70626422526e3c94767cf024896beb15da5342a3f4819bf2feac13e0393;;
    *) echo 'Supported architectures: x86_64 and arm64.' >&2; exit 1;;
  esac
  archive=$(mktemp)
  trap 'rm -f -- "$archive"' EXIT
  curl --fail --location --retry 3 --connect-timeout 15 \
    "https://github.com/actions/runner/releases/download/v2.337.0/actions-runner-linux-$arch-2.337.0.tar.gz" -o "$archive"
  printf '%s  %s\n' "$checksum" "$archive" | sha256sum --check --status
  tar xzf "$archive"
  rm -f -- "$archive"
  trap - EXIT
  # The upstream dependency script does not recognize Amazon Linux reliably.
  source /etc/os-release
  case "$ID:${VERSION_ID:-}" in
    amzn:2023)
      sudo dnf install -y libicu openssl-libs krb5-libs zlib libstdc++ libgcc
      ;;
    amzn:2)
      sudo yum install -y libicu openssl-libs krb5-libs zlib libstdc++ libgcc
      ;;
    *) sudo bash ./bin/installdependencies.sh;;
  esac
  # Fail before fetching credentials if the runner runtime cannot start.
  ./config.sh --version
  # AWS is called as the invoking user, retaining their AWS profile/credentials.
  python3 "$script_dir/register.py" "$repo" "${RUNNER_NAME:-$(hostname)}"
else
  python3 - "$repo" <<'PY'
import json, sys
from pathlib import Path
if json.loads(Path('.runner').read_text()).get('gitHubUrl', '').rstrip('/').lower() != ('https://github.com/' + sys.argv[1]).lower():
    raise SystemExit('Existing runner belongs to another repository; use a different RUNNER_DIR.')
PY
  echo 'Runner already configured; ensuring its service is running.'
fi

if [[ ! -f .service ]]; then
  sudo ./svc.sh install "$(id -un)"
fi

sudo ./svc.sh start
sudo ./svc.sh status
