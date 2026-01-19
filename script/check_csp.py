#!/usr/bin/env python3
"""
CSP チェックスクリプト (Python版)

目的:
 - ビルド成果物 (dist) に対して CSP に違反する可能性のあるコードが含まれていないかを検査します。
 - チェック項目: dist/index.html のインライン <script> / <style>、および dist 配下ファイルでの eval/new Function/Function の使用。

使い方:
 - 事前にビルドを行ってください: `pnpm build`（または `npm run build`）
 - スクリプトを実行: `python3 ./script/check_csp.py` または `./script/check_csp.py`（実行権限が必要）
"""

from __future__ import annotations

import os
import re
import sys
from typing import List, Tuple, Optional

INDEX_SCRIPT_RE = re.compile(r"<script[^>]*>[^<]", re.IGNORECASE)
INDEX_STYLE_RE = re.compile(r"<style[^>]*>[^<]", re.IGNORECASE)
# Be case-sensitive: we want to detect expressions like "eval(" and "Function("
# but not the common lowercase "function(" tokens in minified bundles.
DANGEROUS_RE = re.compile(r"eval\(|new Function\(|\bFunction\(")


def find_inline_tags_in_index(
    index_path: str,
) -> Tuple[List[Tuple[int, str]], List[Tuple[int, str]]]:
    scripts: List[Tuple[int, str]] = []
    styles: List[Tuple[int, str]] = []

    try:
        with open(index_path, "r", encoding="utf-8", errors="replace") as fh:
            for lineno, line in enumerate(fh, start=1):
                if INDEX_SCRIPT_RE.search(line):
                    scripts.append((lineno, line.rstrip("\n")))
                if INDEX_STYLE_RE.search(line):
                    styles.append((lineno, line.rstrip("\n")))
    except FileNotFoundError:
        # index.html がない場合は空の一覧を返す（呼び出し側で存在チェック）
        return scripts, styles

    return scripts, styles


def _has_pattern_with_boundary(content: bytes, pattern: bytes) -> bool:
    """Check if pattern appears with word boundary in binary content.
    
    A word boundary means the pattern is either at the start of content or
    preceded by a non-alphanumeric/non-underscore character. This provides
    consistency with the \\bFunction\\() regex pattern used for text matching.
    
    Japanese: バイナリコンテンツ内でパターンが単語境界を持って出現するか確認する。
    単語境界とは、パターンの前が非英数字/アンダースコア、または文字列の先頭であること。
    """
    index = content.find(pattern)
    while index != -1:
        # Check if pattern is at start or preceded by non-word character
        if index == 0:
            return True
        prev_byte = content[index - 1]
        # For ASCII range bytes, check if it's alphanumeric or underscore
        # We only check ASCII since the patterns we're looking for are ASCII
        if prev_byte < 128:
            prev_char = chr(prev_byte)
            if not (prev_char.isalnum() or prev_char == '_'):
                return True
        else:
            # Non-ASCII bytes are considered word boundaries for our purposes
            return True
        # Search for next occurrence
        index = content.find(pattern, index + 1)
    return False


def find_dangerous_patterns(root_dir: str) -> List[Tuple[str, Optional[int], str]]:
    """dist 配下を再帰的にスキャンして危険なパターンを探す。

    戻り値: (相対パス, 行番号または None, 行の内容または説明)
    """
    matches: List[Tuple[str, Optional[int], str]] = []

    for dirpath, _, filenames in os.walk(root_dir):
        for fname in filenames:
            path = os.path.join(dirpath, fname)
            rel = os.path.relpath(path, root_dir)
            try:
                with open(path, "r", encoding="utf-8", errors="replace") as fh:
                    for lineno, line in enumerate(fh, start=1):
                        if DANGEROUS_RE.search(line):
                            matches.append((rel, lineno, line.rstrip("\n")))
            except Exception:
                # テキストとして読めない場合はバイナリとして簡易チェック
                try:
                    with open(path, "rb") as bf:
                        content = bf.read()
                        # 単語境界を考慮したパターンマッチング
                        if (
                            b"eval(" in content
                            or b"new Function(" in content
                            or _has_pattern_with_boundary(content, b"Function(")
                        ):
                            matches.append(
                                (rel, None, "<binary file contains pattern>")
                            )
                except Exception:
                    # 読めないファイルは無視
                    pass

    return matches


def main() -> None:
    print("Running CSP checks...")

    if not os.path.isdir("dist"):
        print(
            "Error: dist/ directory not found. Did you run the build?", file=sys.stderr
        )
        sys.exit(2)

    index_path = os.path.join("dist", "index.html")
    inline_scripts, inline_styles = find_inline_tags_in_index(index_path)
    eval_matches = find_dangerous_patterns("dist")

    if inline_scripts or inline_styles or eval_matches:
        print("CSP check failed:", file=sys.stderr)
        if inline_scripts:
            print("Inline <script> found in dist/index.html:", file=sys.stderr)
            for lineno, text in inline_scripts:
                print(f"{index_path}:{lineno}:{text}", file=sys.stderr)
        if inline_styles:
            print("Inline <style> found in dist/index.html:", file=sys.stderr)
            for lineno, text in inline_styles:
                print(f"{index_path}:{lineno}:{text}", file=sys.stderr)
        if eval_matches:
            print(
                "Potential dangerous patterns found in dist (eval/new Function/Function):",
                file=sys.stderr,
            )
            for rel, lineno, text in eval_matches:
                if lineno is None:
                    print(f"{rel}:<binary>: {text}", file=sys.stderr)
                else:
                    print(f"{rel}:{lineno}:{text}", file=sys.stderr)
        sys.exit(1)

    print("CSP checks passed.")
    sys.exit(0)


if __name__ == "__main__":
    main()
