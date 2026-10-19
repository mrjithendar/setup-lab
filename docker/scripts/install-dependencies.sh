#!/usr/bin/env bash
# Common host tools only; Docker and application deployment are separate stages.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
[[ $(uname -s) == Linux ]] || { echo 'Linux is required.' >&2; exit 1; }
script_dir=$(cd -- "$(dirname -- "$0")" && pwd -P)
source /etc/os-release
source "$script_dir/platform.sh"
platform=$(select_platform "$ID" "$VERSION_ID") || { echo "Unsupported distribution: $ID $VERSION_ID." >&2; exit 1; }
case "$platform" in
  apt)
    apt-get update
    # apt installs/upgrades these packages to the current repository candidate.
    apt-get install -y ca-certificates curl git python3 python3-venv python3-pip util-linux tar gzip coreutils
    ;;
  amazon|rpm)
    packages=(ca-certificates git python3 python3-pip util-linux tar gzip coreutils)
    dnf makecache --refresh
    dnf install -y "${packages[@]}"
    dnf upgrade -y "${packages[@]}"
    # Preserve the minimal curl variant to avoid the Amazon Linux RPM conflict.
    if rpm -q curl-minimal >/dev/null 2>&1; then
      dnf upgrade -y curl-minimal
    elif rpm -q curl >/dev/null 2>&1; then
      dnf upgrade -y curl
    elif ! command -v curl >/dev/null; then
      dnf install -y curl-minimal
    fi
    ;;
esac
python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 9) else "Python 3.9+ required; upgrade the OS repositories/release.")'
bash "$script_dir/install-aws-cli.sh"
python3 --version
git --version
echo 'Common dependencies ready. Python uses the current distribution-supported python3 package.'
