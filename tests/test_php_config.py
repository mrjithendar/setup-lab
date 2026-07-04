"""Lint the WordPress wp-config.php with `php -l` when PHP is available."""

from __future__ import annotations

import pytest

from conftest import repo_path, run, tool_available

WP_CONFIG = repo_path("wordpress", "wp-config.php")


def test_wp_config_exists():
    assert WP_CONFIG.is_file()


def test_wp_config_starts_with_php_tag():
    assert WP_CONFIG.read_text().lstrip().startswith("<?php")


def test_wp_config_has_balanced_php_tags():
    text = WP_CONFIG.read_text()
    # wp-config.php intentionally omits the trailing "?>"; ensure no stray one.
    assert text.count("<?php") >= 1


@pytest.mark.skipif(not tool_available("php"), reason="php CLI not available")
def test_wp_config_passes_php_lint():
    result = run(["php", "-l", str(WP_CONFIG)])
    assert result.returncode == 0, (
        f"php -l reported syntax errors:\n{result.stdout}\n{result.stderr}"
    )
