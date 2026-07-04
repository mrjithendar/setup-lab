"""Validate the Docker Compose stacks.

Uses `docker compose config` for full schema + interpolation validation when
Docker is available, and always falls back to structural YAML checks so the
suite still provides value in environments without Docker.
"""

from __future__ import annotations

import yaml
import pytest

from conftest import COMPOSE_FILES, run, tool_available


def _docker_compose_available() -> bool:
    if not tool_available("docker"):
        return False
    return run(["docker", "compose", "version"]).returncode == 0


DOCKER_COMPOSE = _docker_compose_available()


def test_compose_files_discovered():
    assert COMPOSE_FILES, "expected at least one docker-compose.yml in the repo"


@pytest.mark.parametrize("compose_file", COMPOSE_FILES, ids=lambda p: p.parent.name)
def test_compose_is_valid_yaml(compose_file):
    data = yaml.safe_load(compose_file.read_text())
    assert isinstance(data, dict), f"{compose_file} did not parse to a mapping"
    assert data.get("services"), f"{compose_file} defines no services"


@pytest.mark.parametrize("compose_file", COMPOSE_FILES, ids=lambda p: p.parent.name)
def test_every_service_has_image_or_build(compose_file):
    data = yaml.safe_load(compose_file.read_text())
    for name, svc in data["services"].items():
        assert "image" in svc or "build" in svc, (
            f"service '{name}' in {compose_file} has neither 'image' nor 'build'"
        )


@pytest.mark.parametrize("compose_file", COMPOSE_FILES, ids=lambda p: p.parent.name)
def test_named_volumes_are_declared(compose_file):
    """Every short-form named volume mount must map to a declared top-level volume.

    Bind mounts (starting with '.', '/', or '~') and anonymous volumes are
    ignored; only named-volume references are checked.
    """
    data = yaml.safe_load(compose_file.read_text())
    declared = set((data.get("volumes") or {}).keys())
    for name, svc in data["services"].items():
        for vol in svc.get("volumes", []) or []:
            if not isinstance(vol, str):
                continue
            source = vol.split(":", 1)[0]
            if source.startswith((".", "/", "~")):
                continue  # bind mount
            assert source in declared, (
                f"service '{name}' in {compose_file} mounts undeclared "
                f"named volume '{source}'"
            )


@pytest.mark.parametrize("compose_file", COMPOSE_FILES, ids=lambda p: p.parent.name)
def test_service_networks_are_declared(compose_file):
    data = yaml.safe_load(compose_file.read_text())
    declared = set((data.get("networks") or {}).keys())
    for name, svc in data["services"].items():
        nets = svc.get("networks")
        if not nets:
            continue
        names = nets if isinstance(nets, list) else list(nets.keys())
        for net in names:
            assert net in declared, (
                f"service '{name}' in {compose_file} uses undeclared "
                f"network '{net}'"
            )


@pytest.mark.skipif(not DOCKER_COMPOSE, reason="docker compose not available")
@pytest.mark.parametrize("compose_file", COMPOSE_FILES, ids=lambda p: p.parent.name)
def test_docker_compose_config_validates(compose_file):
    result = run(["docker", "compose", "-f", str(compose_file), "config", "-q"])
    assert result.returncode == 0, (
        f"`docker compose config` failed for {compose_file}:\n{result.stderr}"
    )
