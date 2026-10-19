#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# Explicit empty env file disables automatic loading of a legacy .env.
if [[ -n ${SHARED_PASSWORD:-} ]]; then
  exec docker compose --env-file /dev/null "$@"
fi
exec ../.venv/bin/python configure-secret.py -- docker compose --env-file /dev/null "$@"
