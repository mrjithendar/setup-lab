"""Structural checks for the Prometheus scrape config."""

from __future__ import annotations

import yaml

from conftest import repo_path

PROM_CONFIG = repo_path("monitoring", "prometheus", "prometheus.yml")


def _load():
    return yaml.safe_load(PROM_CONFIG.read_text())


def test_prometheus_config_exists():
    assert PROM_CONFIG.is_file()


def test_global_scrape_interval_present():
    cfg = _load()
    assert "global" in cfg
    assert "scrape_interval" in cfg["global"]


def test_scrape_configs_have_unique_job_names():
    cfg = _load()
    jobs = [j["job_name"] for j in cfg["scrape_configs"]]
    assert jobs, "no scrape jobs defined"
    assert len(jobs) == len(set(jobs)), f"duplicate job_name entries: {jobs}"


def test_every_job_defines_targets():
    cfg = _load()
    for job in cfg["scrape_configs"]:
        static = job.get("static_configs")
        assert static, f"job '{job['job_name']}' has no static_configs"
        assert any(sc.get("targets") for sc in static), (
            f"job '{job['job_name']}' defines no targets"
        )


def test_targets_use_host_port_form():
    cfg = _load()
    for job in cfg["scrape_configs"]:
        for sc in job["static_configs"]:
            for target in sc.get("targets", []):
                assert ":" in target, (
                    f"target '{target}' in job '{job['job_name']}' "
                    "is missing a port"
                )
                port = target.rsplit(":", 1)[1]
                assert port.isdigit(), (
                    f"target '{target}' in job '{job['job_name']}' "
                    "has a non-numeric port"
                )
