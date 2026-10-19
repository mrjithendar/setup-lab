#!/usr/bin/env bash
set -Eeuo pipefail

CONTAINER_NAME="artifactory"
VOLUME_NAME="artifactory-data"
IMAGE="releases-docker.jfrog.io/jfrog/artifactory-oss:${JFROG_VERSION:-latest}"

# Check Docker is installed and accessible.
if ! docker info >/dev/null 2>&1; then
  echo "Docker is unavailable. Start Docker or run this script with sudo."
  exit 1
fi

# Start an existing container without replacing its configuration.
if docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  docker start "$CONTAINER_NAME"
else
  docker pull "$IMAGE"
  docker volume create "$VOLUME_NAME" >/dev/null

  docker run -d --name "$CONTAINER_NAME" --restart unless-stopped \
    --ulimit nofile=32000:40000 --ulimit nproc=65535 \
    -p 8081:8081 -p 8082:8082 -v "$VOLUME_NAME:/var/opt/jfrog/artifactory" "$IMAGE"
fi

echo
echo "Artifactory is starting; initial startup can take several minutes."
echo "Web UI: http://<SERVER-IP>:8082/ui/"
echo "Logs:   docker logs -f $CONTAINER_NAME"

sleep 10

docker logs -f artifactory
# docker stop artifactory
# docker start artifactory