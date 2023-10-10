#!/bin/bash
set -eux

cd "$(dirname "$0")"

# node.js - How to update each dependency in package.json to the latest version? - Stack Overflow
# https://stackoverflow.com/questions/16073603/how-to-update-each-dependency-in-package-json-to-the-latest-version

npx npm-check-updates -u
npm install  
