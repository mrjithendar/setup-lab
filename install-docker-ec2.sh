#!/usr/bin/env bash
# Run with sudo on a fresh Amazon Linux 2023 or Ubuntu 22.04/24.04 EC2 host.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
source /etc/os-release
case "$ID:$VERSION_ID" in
  amzn:2023)
    dnf install -y docker curl git python3 python3-pip
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
    ;;
  ubuntu:22.04|ubuntu:24.04)
    apt-get update
    apt-get install -y ca-certificates curl git python3 python3-venv
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    cat > /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: ${UBUNTU_CODENAME:-$VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ;;
  *) echo 'Supported: Amazon Linux 2023, Ubuntu 22.04/24.04.' >&2; exit 1;;
esac
systemctl enable --now docker
docker compose version
docker info --format '{{.ServerVersion}}'
