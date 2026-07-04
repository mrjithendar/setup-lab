"""Validate PHP/php-fpm .ini-style config files.

PHP ini files may omit section headers (e.g. custom-php.ini) or use them
(e.g. www.conf, my.cnf), so we don't rely on Python's configparser.  Instead we
check that every non-comment, non-blank line is either a ``[section]`` header or
a ``key = value`` assignment.
"""

from __future__ import annotations

import pytest

from conftest import repo_path

INI_FILES = [
    repo_path("wordpress", "opcache.ini"),
    repo_path("wordpress", "custom-php.ini"),
    repo_path("wordpress", "www.conf"),
    repo_path("monitoring", "mysql-exporter", "my.cnf"),
    repo_path("nginx", "cloudflare.ini"),
]


def _iter_meaningful_lines(text: str):
    for lineno, raw in enumerate(text.splitlines(), start=1):
        line = raw.strip()
        if not line or line.startswith((";", "#")):
            continue
        yield lineno, line


@pytest.mark.parametrize("ini_file", INI_FILES, ids=lambda p: p.name)
def test_ini_file_exists(ini_file):
    assert ini_file.is_file(), f"expected config file {ini_file} to exist"


@pytest.mark.parametrize("ini_file", INI_FILES, ids=lambda p: p.name)
def test_ini_lines_are_well_formed(ini_file):
    for lineno, line in _iter_meaningful_lines(ini_file.read_text()):
        is_section = line.startswith("[") and line.endswith("]")
        is_assignment = "=" in line
        assert is_section or is_assignment, (
            f"{ini_file}:{lineno} is neither a section header nor a "
            f"key=value assignment: {line!r}"
        )


@pytest.mark.parametrize("ini_file", INI_FILES, ids=lambda p: p.name)
def test_ini_keys_are_non_empty(ini_file):
    for lineno, line in _iter_meaningful_lines(ini_file.read_text()):
        if line.startswith("[") or "=" not in line:
            continue
        key = line.split("=", 1)[0].strip()
        assert key, f"{ini_file}:{lineno} has an empty key: {line!r}"
