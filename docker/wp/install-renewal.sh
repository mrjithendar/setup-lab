#!/usr/bin/env bash
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
cd "$(dirname "$0")"
root=$(pwd -P)
# systemd interprets percent specifiers; keep unit path handling unambiguous.
[[ "$root" != *[%\\\"]* && "$root" != *$'\n'* ]] || { echo 'Unsupported installation path.' >&2; exit 1; }
python3 - "$root" <<'PYTHON'
import pathlib, sys
root = sys.argv[1]
text = pathlib.Path('systemd/wordpress-cert-renew.service').read_text()
pathlib.Path('/etc/systemd/system/wordpress-cert-renew.service').write_text(text.replace('@WORKDIR@', root))
PYTHON
install -m 0644 systemd/wordpress-cert-renew.timer /etc/systemd/system/wordpress-cert-renew.timer
chmod 0644 /etc/systemd/system/wordpress-cert-renew.service
systemd-analyze verify /etc/systemd/system/wordpress-cert-renew.service /etc/systemd/system/wordpress-cert-renew.timer
systemctl daemon-reload
systemctl enable --now wordpress-cert-renew.timer
systemctl list-timers wordpress-cert-renew.timer
