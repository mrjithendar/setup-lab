#!/usr/bin/env bash
# Install prerequisites on supported systemd Linux hosts.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
[[ $(uname -s) == Linux && -d /run/systemd/system ]] || { echo 'A Linux host running systemd is required.' >&2; exit 1; }
case "$(uname -m)" in x86_64|aarch64) ;; *) echo 'Supported architectures: x86_64, aarch64.' >&2; exit 1;; esac
source /etc/os-release
source "$(dirname "$0")/scripts/platform.sh"
platform=$(select_platform "$ID" "$VERSION_ID") || { echo "Unsupported distribution: $ID $VERSION_ID. See README.md." >&2; exit 1; }
case "$platform" in
  amazon)
    dnf install -y docker ca-certificates git python3 python3-pip util-linux
    # curl-minimal already provides curl; installing full curl causes a conflict.
    command -v curl >/dev/null || dnf install -y curl-minimal
    case "$(uname -m)" in x86_64|aarch64) arch=$(uname -m);; *) echo 'Unsupported architecture' >&2; exit 1;; esac
    compose_version=${COMPOSE_VERSION:-v5.6.0}
    temp_dir=$(mktemp -d)
    trap 'rm -rf "$temp_dir"' EXIT
    asset="docker-compose-linux-$arch"
    curl -fL "https://github.com/docker/compose/releases/download/$compose_version/$asset" -o "$temp_dir/$asset"
    curl -fL "https://github.com/docker/compose/releases/download/$compose_version/checksums.txt" -o "$temp_dir/checksums.txt"
    (cd "$temp_dir"; awk -v file="$asset" '$2 == file || $2 == "*" file' checksums.txt > selected.sha256; test -s selected.sha256; sha256sum -c selected.sha256)
    install -d /usr/local/lib/docker/cli-plugins
    install -m 0755 "$temp_dir/$asset" /usr/local/lib/docker/cli-plugins/docker-compose
    # Amazon Linux's Docker package may ship an older Buildx than Compose requires.
    case "$arch" in x86_64) buildx_arch=amd64;; aarch64) buildx_arch=arm64;; esac
    buildx_version=${BUILDX_VERSION:-v0.31.1}
    asset="buildx-$buildx_version.linux-$buildx_arch"
    curl -fL "https://github.com/docker/buildx/releases/download/$buildx_version/$asset" -o "$temp_dir/$asset"
    curl -fL "https://github.com/docker/buildx/releases/download/$buildx_version/checksums.txt" -o "$temp_dir/buildx-checksums.txt"
    (cd "$temp_dir"; awk -v file="$asset" '$2 == file || $2 == "*" file' buildx-checksums.txt > buildx-selected.sha256; test -s buildx-selected.sha256; sha256sum -c buildx-selected.sha256)
    install -m 0755 "$temp_dir/$asset" /usr/local/lib/docker/cli-plugins/docker-buildx
    ;;
  apt)
    apt-get update
    apt-get install -y ca-certificates curl git python3 python3-venv util-linux
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/$ID/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    cat > /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/$ID
Suites: ${UBUNTU_CODENAME:-$VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ;;
  rpm)
    dnf install -y ca-certificates git python3 python3-pip util-linux
    command -v curl >/dev/null || dnf install -y curl-minimal
    repo_os=$ID
    case "$ID" in rocky|almalinux) repo_os=centos;; esac
    curl -fsSL --retry 3 "https://download.docker.com/linux/$repo_os/docker-ce.repo" -o /etc/yum.repos.d/docker-ce.repo
    dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ;;
esac
systemctl enable --now docker
if command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then
  firewall-cmd --permanent --add-service=http --add-service=https
  firewall-cmd --add-service=http --add-service=https
fi
buildx_output=$(docker buildx version)
echo "$buildx_output"
python3 - "$buildx_output" <<'PYTHON'
import re, sys
version = re.search(r'\bv(\d+)\.(\d+)\.(\d+)\b', sys.argv[1])
if not version or tuple(map(int, version.groups())) < (0, 17, 0):
    raise SystemExit('Docker Compose requires Buildx >= 0.17.0. Check for an older plugin overriding the installed version.')
PYTHON
docker compose version
docker info --format '{{.ServerVersion}}'
