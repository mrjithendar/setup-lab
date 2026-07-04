"""Validate nginx config syntax using crossplane (pure-Python nginx parser)."""

from __future__ import annotations

import crossplane
import pytest

from conftest import REPO_ROOT

NGINX_CONF_FILES = sorted(
    p
    for p in REPO_ROOT.rglob("*.conf")
    if ".git" not in p.parts and "nginx" in p.parts
)


def test_nginx_conf_files_discovered():
    assert NGINX_CONF_FILES, "expected to find nginx .conf files"


@pytest.mark.parametrize(
    "conf_file", NGINX_CONF_FILES, ids=lambda p: str(p.relative_to(REPO_ROOT))
)
def test_nginx_conf_parses(conf_file):
    # single=True parses just this file without following `include` directives
    # (which reference container paths that don't exist on the test host).
    result = crossplane.parse(
        str(conf_file), single=True, check_ctx=False, check_args=False
    )
    assert result["status"] == "ok", (
        f"{conf_file} has nginx syntax errors: {result['errors']}"
    )
