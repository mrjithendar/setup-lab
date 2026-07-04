# Config validation tests

This repository is infrastructure-as-config (Docker Compose, nginx, WordPress/PHP,
and a Grafana monitoring stack) rather than an application codebase, so there is
no application logic to unit test. Instead, this suite validates that the config
files are syntactically well-formed and internally consistent.

## What is covered

| Test file | Validates |
|---|---|
| `test_docker_compose.py` | Every `*/docker-compose.yml` parses, each service has `image`/`build`, named volumes and networks are declared, and `docker compose config` succeeds (when Docker is present). |
| `test_yaml_configs.py` | All YAML config files (Prometheus, Loki, Tempo, Redpanda console, CI) parse. |
| `test_prometheus_config.py` | Prometheus scrape config has a global interval, unique job names, targets, and `host:port` targets. |
| `test_nginx_configs.py` | All nginx `*.conf` files parse via [`crossplane`](https://github.com/nginxinc/crossplane). |
| `test_ini_configs.py` | PHP/php-fpm/mysql `.ini`/`.conf`/`.cnf` files are well-formed `key = value` / `[section]` lines. |
| `test_php_config.py` | `wp-config.php` starts with `<?php` and passes `php -l` (when PHP is present). |
| `test_shell_scripts.py` | Shell scripts pass `bash -n` syntax checking. |
| `test_alloy_config.py` | Grafana Alloy config has balanced delimiters and expected blocks. |

Tests that need an external tool (`docker`, `php`) skip gracefully when it is not
installed, so the suite is useful locally and thorough in CI.

## Running

```bash
pip install -r tests/requirements-dev.txt
pytest -c tests/pytest.ini tests
```

CI runs the same command via `.github/workflows/config-tests.yml`, which also
installs a PHP CLI so the `wp-config.php` lint runs.
