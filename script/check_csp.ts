#!/usr/bin/env node

/**
 * CSP check script (TypeScript)
 *
 * Implements CSP checks for the built assets (originally implemented in Python).
 */

import fs from "fs";
import path from "path";

const INDEX_SCRIPT_RE = /<script(?![^>]*\bsrc\b)[^>]*>[^<]/i;
const INDEX_STYLE_RE = /<style\b[^>]*>\s*[^<\s]/i;
const DANGEROUS_RE = /eval\(|new Function\(|\bFunction\(/;

export function findInlineTagsInIndex(indexPath: string): [Array<[number, string]>, Array<[number, string]>] {
    const scripts: Array<[number, string]> = [];
    const styles: Array<[number, string]> = [];

    try {
        const text = fs.readFileSync(indexPath, { encoding: "utf-8" });
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const lineno = i + 1;
            const line = lines[i];
            if (INDEX_SCRIPT_RE.test(line)) {
                scripts.push([lineno, line.replace(/\n$/, "")]);
            }
            if (INDEX_STYLE_RE.test(line)) {
                styles.push([lineno, line.replace(/\n$/, "")]);
            }
        }
    } catch (err: unknown) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") {
            // Missing index is treated as empty lists (same as Python behaviour)
            return [scripts, styles];
        }
        throw err;
    }

    return [scripts, styles];
}

function hasPatternWithBoundary(content: Buffer, pattern: Buffer): boolean {
    let index = content.indexOf(pattern);
    while (index !== -1) {
        if (index === 0) return true;
        const prevByte = content[index - 1];
        if (prevByte < 128) {
            const prevChar = String.fromCharCode(prevByte);
            if (!(/[A-Za-z0-9_]/.test(prevChar))) {
                return true;
            }
        } else {
            // Non-ASCII byte treated as word boundary (conservative)
            return true;
        }
        index = content.indexOf(pattern, index + 1);
    }
    return false;
}

export function findDangerousPatterns(rootDir: string): Array<[string, number | null, string]> {
    const matches: Array<[string, number | null, string]> = [];

    function walk(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const ent of entries) {
            const full = path.join(dir, ent.name);
            const rel = path.relative(rootDir, full);
            if (ent.isDirectory()) {
                walk(full);
                continue;
            }

            try {
                const text = fs.readFileSync(full, { encoding: "utf-8" });
                const lines = text.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    const lineno = i + 1;
                    const line = lines[i];
                    if (DANGEROUS_RE.test(line)) {
                        matches.push([rel, lineno, line.replace(/\n$/, "")]);
                    }
                }
            } catch (e) {
                // Not readable as text, try binary read
                try {
                    const content = fs.readFileSync(full);
                    if (
                        content.includes(Buffer.from("eval(")) ||
                        content.includes(Buffer.from("new Function(")) ||
                        hasPatternWithBoundary(content, Buffer.from("Function("))
                    ) {
                        matches.push([rel, null, "<binary file contains pattern>"]);
                    }
                } catch {
                    // ignore unreadable files
                }
            }
        }
    }

    walk(rootDir);
    return matches;
}

export function main(): number {
    console.log("Running CSP checks...");

    if (!fs.existsSync("dist") || !fs.statSync("dist").isDirectory()) {
        console.error("Error: dist/ directory not found. Did you run the build?");
        return 2;
    }

    const indexPath = path.join("dist", "index.html");
    const [inlineScripts, inlineStyles] = findInlineTagsInIndex(indexPath);
    const evalMatches = findDangerousPatterns("dist");

    if (inlineScripts.length || inlineStyles.length || evalMatches.length) {
        console.error("CSP check failed:");
        if (inlineScripts.length) {
            console.error("Inline <script> found in dist/index.html:");
            for (const [lineno, text] of inlineScripts) {
                console.error(`${indexPath}:${lineno}:${text}`);
            }
        }
        if (inlineStyles.length) {
            console.error("Inline <style> found in dist/index.html:");
            for (const [lineno, text] of inlineStyles) {
                console.error(`${indexPath}:${lineno}:${text}`);
            }
        }
        if (evalMatches.length) {
            console.error(
                "Potential dangerous patterns found in dist (eval/new Function/Function):"
            );
            for (const [rel, lineno, text] of evalMatches) {
                if (lineno === null) {
                    console.error(`${rel}:<binary>: ${text}`);
                } else {
                    console.error(`${rel}:${lineno}:${text}`);
                }
            }
        }
        return 1;
    }

    console.log("CSP checks passed.");
    return 0;
}

if (!process.env.VITEST && process.env.NODE_ENV !== "test") {
    const code = main();
    process.exit(code);
}
