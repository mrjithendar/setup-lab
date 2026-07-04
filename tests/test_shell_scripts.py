"""Validate shell scripts with `bash -n` (syntax check without execution)."""

from __future__ import annotations

import pytest

from conftest import REPO_ROOT, run, tool_available

SHELL_SCRIPTS = sorted(
    p for p in REPO_ROOT.rglob("*.sh") if ".git" not in p.parts
)


def test_shell_scripts_discovered():
    assert SHELL_SCRIPTS, "expected to find at least one .sh script"


@pytest.mark.skipif(not tool_available("bash"), reason="bash not available")
@pytest.mark.parametrize(
    "script", SHELL_SCRIPTS, ids=lambda p: str(p.relative_to(REPO_ROOT))
)
def test_shell_script_syntax(script):
    result = run(["bash", "-n", str(script)])
    assert result.returncode == 0, (
        f"bash syntax error in {script}:\n{result.stderr}"
    )
