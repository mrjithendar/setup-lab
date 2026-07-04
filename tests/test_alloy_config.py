"""Structural checks for the Grafana Alloy config (River/Alloy syntax).

Alloy config isn't YAML/JSON, and the `alloy` binary isn't generally available
in CI, so we validate structural invariants: balanced braces/brackets/parens and
the presence of expected top-level blocks.
"""

from __future__ import annotations

from conftest import repo_path

ALLOY_CONFIG = repo_path("monitoring", "alloy", "config.alloy")

PAIRS = {")": "(", "]": "[", "}": "{"}
OPENERS = set(PAIRS.values())


def _strip_comments_and_strings(text: str) -> str:
    """Remove // line comments and double-quoted strings so their contents
    don't affect delimiter balancing."""
    out = []
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == "/" and i + 1 < n and text[i + 1] == "/":
            while i < n and text[i] != "\n":
                i += 1
            continue
        if ch == '"':
            i += 1
            while i < n and text[i] != '"':
                if text[i] == "\\":
                    i += 1
                i += 1
            i += 1
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def test_alloy_config_exists():
    assert ALLOY_CONFIG.is_file()


def test_alloy_delimiters_balanced():
    text = _strip_comments_and_strings(ALLOY_CONFIG.read_text())
    stack = []
    for ch in text:
        if ch in OPENERS:
            stack.append(ch)
        elif ch in PAIRS:
            assert stack, f"unbalanced '{ch}' (nothing open)"
            assert stack.pop() == PAIRS[ch], f"mismatched delimiter near '{ch}'"
    assert not stack, f"unclosed delimiters: {stack}"


def test_alloy_defines_expected_blocks():
    text = ALLOY_CONFIG.read_text()
    for block in ("logging", "loki.write", "prometheus.remote_write"):
        assert block in text, f"expected an Alloy '{block}' block"
