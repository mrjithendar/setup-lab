"""Validate that every YAML config file parses cleanly."""

from __future__ import annotations

import yaml
import pytest

from conftest import REPO_ROOT

YAML_FILES = sorted(
    p
    for p in REPO_ROOT.rglob("*.y*ml")
    if ".git" not in p.parts and p.name != "docker-compose.yml"
)


def test_yaml_files_discovered():
    assert YAML_FILES, "expected to find YAML config files"


@pytest.mark.parametrize(
    "yaml_file", YAML_FILES, ids=lambda p: str(p.relative_to(REPO_ROOT))
)
def test_yaml_parses(yaml_file):
    # Use safe_load_all to tolerate multi-document files.
    docs = list(yaml.safe_load_all(yaml_file.read_text()))
    assert docs, f"{yaml_file} parsed to no documents"
    assert any(d is not None for d in docs), f"{yaml_file} is empty"
