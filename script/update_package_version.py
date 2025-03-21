#!/usr/bin/env python3

import json
import os
import argparse


def update_package_version(new_version, package_json_path):
    """
    package.json の version を new_version に書き換える。

    :param new_version: 新しいバージョン文字列 (例: "1.2.3")
    :param package_json_path: バージョンを変更する package.json のパス
    """
    if not os.path.exists(package_json_path):
        raise FileNotFoundError(f"{package_json_path} が見つかりません。")

    # package.json の読み込み
    with open(package_json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # version フィールドを上書き
    data["version"] = new_version

    # 上書きした内容をファイルに出力
    with open(package_json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(
        f"'{package_json_path}' の version フィールドを '{new_version}' に更新しました。"
    )


def main():
    parser = argparse.ArgumentParser(
        description="package.json のバージョン番号を更新するスクリプト"
    )
    # new_version は必須引数として受け取る
    parser.add_argument("new_version", help="新しいバージョン番号 (例: 1.2.3)")
    # --path はオプション引数として受け取り、デフォルト値を 'package.json' に
    parser.add_argument(
        "-p",
        "--path",
        default="package.json",
        help="バージョンを更新する package.json のパス (省略時は package.json)",
    )
    args = parser.parse_args()

    update_package_version(args.new_version, args.path)


if __name__ == "__main__":
    main()
