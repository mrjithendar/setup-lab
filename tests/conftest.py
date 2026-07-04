"""Shared fixtures and helpers for the config-validation test suite.

This repository contains no application code; it is a collection of
infrastructure/config files (Docker Compose, nginx, WordPress/PHP, and
monitoring stack configs).  These tests validate that those config files are
syntactically well-formed and internally consistent.
"""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent


def repo_path(*parts: str) -> Path:
    """Return an absolute path inside the repository."""
    return REPO_ROOT.joinpath(*parts)


# All docker-compose files in the repo, discovered dynamically so new stacks are
# picked up automatically.
COMPOSE_FILES = sorted(
    p for p in REPO_ROOT.glob("*/docker-compose.yml") if ".git" not in p.parts
)


def tool_available(name: str) -> bool:
    """Return True if an executable is on PATH."""
    return shutil.which(name) is not None


def run(cmd: list[str], **kwargs) -> subprocess.CompletedProcess:
    """Run a command capturing output, without raising on non-zero exit."""
    return subprocess.run(
        cmd,
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        check=False,
        **kwargs,
    )


@pytest.fixture(scope="session")
def repo_root() -> Path:
    return REPO_ROOT
