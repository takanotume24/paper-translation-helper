#!/usr/bin/env bash
set -euxo pipefail

# CSP チェックスクリプト
# 目的:
#  - ビルド成果物 (dist) に対して CSP に違反する可能性のあるコードが含まれていないかを検査します。
#  - チェック項目: dist/index.html のインライン <script> / <style>、および dist 配下ファイルでの eval/new Function/Function の使用。
# 使い方（ローカル）:
#  - 事前にビルドを行ってください: `pnpm build`（または `npm run build`）
#  - スクリプトを実行: `bash ./script/check_csp.sh`

echo "Running CSP checks..."

# dist ディレクトリが存在することを確認
if [ ! -d dist ]; then
  echo "Error: dist/ directory not found. Did you run the build?"
  exit 2
fi

# dist/index.html にインラインの <script> または <style> が含まれているか検出
INLINE_SCRIPT=$(grep -n -E '<script[^>]*>[^<]' dist/index.html || true)
INLINE_STYLE=$(grep -n -E '<style[^>]*>[^<]' dist/index.html || true)
# dist 配下のアセットに eval/new Function/Function のような危険な実行パターンがないか検出
EVALS=$(grep -n -R -E 'eval\(|new Function\(|\bFunction\(' dist || true)

# いずれかが検出されたらエラーとする
if [ -n "$INLINE_SCRIPT" ] || [ -n "$INLINE_STYLE" ] || [ -n "$EVALS" ]; then
  echo "CSP check failed:" >&2
  if [ -n "$INLINE_SCRIPT" ]; then
    echo "Inline <script> found in dist/index.html:" >&2
    echo "$INLINE_SCRIPT" >&2
  fi
  if [ -n "$INLINE_STYLE" ]; then
    echo "Inline <style> found in dist/index.html:" >&2
    echo "$INLINE_STYLE" >&2
  fi
  if [ -n "$EVALS" ]; then
    echo "Potential dangerous patterns found in dist (eval/new Function/Function):" >&2
    echo "$EVALS" >&2
  fi
  # 検出があれば CI を失敗させるため exit 1
  exit 1
fi

# ここまで来たら問題無し
echo "CSP checks passed."