import { test, expect, vi } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";
import { findInlineTagsInIndex, findDangerousPatterns } from "../check_csp.ts";

function makeTempDir(prefix = "csp-test-") {
    return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

test("findInlineTagsInIndex - missing index returns empty arrays", () => {
    const tmp = makeTempDir();
    const indexPath = path.join(tmp, "index.html"); // does not exist

    const [scripts, styles] = findInlineTagsInIndex(indexPath);
    expect(scripts).toEqual([]);
    expect(styles).toEqual([]);

    fs.rmSync(tmp, { recursive: true, force: true });
});

test("findInlineTagsInIndex - detects inline <script> and <style> but ignores scripts with src", () => {
    const tmp = makeTempDir();
    const indexPath = path.join(tmp, "index.html");
    const content = [
        "<!doctype html>",
        "<html>",
        "<head>",
        "<script src=\"app.js\"></script>",
        "<script>console.log(\"inline script\")</script>",
        "<style>body{color:red}</style>",
        "</head>",
        "</html>",
    ].join("\n");
    fs.writeFileSync(indexPath, content, { encoding: "utf-8" });

    const [scripts, styles] = findInlineTagsInIndex(indexPath);

    expect(scripts.length).toBe(1);
    expect(scripts[0][0]).toBe(5); // line number where inline script exists
    expect(scripts[0][1]).toContain("console.log");

    expect(styles.length).toBe(1);
    expect(styles[0][0]).toBe(6);
    expect(styles[0][1]).toContain("body{color:red}");

    fs.rmSync(tmp, { recursive: true, force: true });
});

test("findDangerousPatterns - finds eval/new Function and detects binary pattern via fallback", () => {
    const tmp = makeTempDir();

    // Text files that should match
    fs.writeFileSync(path.join(tmp, "a.js"), `const x = eval(\"1+1\");\n`);
    fs.writeFileSync(path.join(tmp, "b.js"), `const f = new Function(\"x\", \"return x+1\");\n`);
    // Text file that should NOT match
    fs.writeFileSync(path.join(tmp, "d.js"), `function myFunction() { return 1 }\n`);

    // Binary-like file: we'll simulate that reading as text throws (so the code tries binary read)
    const binaryPath = path.join(tmp, "c.bin");
    fs.writeFileSync(binaryPath, Buffer.from([0xff, 0xfe, 0xfd, 32, ...Buffer.from("Function(")]));

    // Spy on fs.readFileSync to force a throw when attempting to read c.bin as utf-8
    const originalRead = fs.readFileSync.bind(fs);
    const spy = vi.spyOn(fs, "readFileSync").mockImplementation((...args: Parameters<typeof fs.readFileSync>) => {
        const [full, opts] = args;
        if (
            typeof full === "string" &&
            full === binaryPath &&
            opts &&
            typeof opts === "object" &&
            "encoding" in opts &&
            (opts as { encoding?: BufferEncoding }).encoding === "utf-8"
        ) {
            throw new Error("invalid text encoding");
        }
        return originalRead(...args);
    });

    const matches = findDangerousPatterns(tmp);

    // a.js and b.js should be present
    expect(matches.some(m => m[0] === "a.js" && m[1] === 1 && (m[2] as string).includes("eval("))).toBe(true);
    expect(matches.some(m => m[0] === "b.js" && m[1] === 1 && (m[2] as string).includes("new Function("))).toBe(true);

    // c.bin should be detected via binary fallback with lineno === null
    expect(matches.some(m => m[0] === "c.bin" && m[1] === null && m[2] === "<binary file contains pattern>")).toBe(true);

    // d.js should NOT be present
    expect(matches.some(m => m[0] === "d.js")).toBe(false);

    // cleanup
    spy.mockRestore();
    fs.rmSync(tmp, { recursive: true, force: true });
});

// Additional edge-case tests to increase coverage

test("findInlineTagsInIndex - empty index returns no matches", () => {
    const tmp = makeTempDir();
    const indexPath = path.join(tmp, "index.html");
    fs.writeFileSync(indexPath, "", { encoding: "utf-8" });

    const [scripts, styles] = findInlineTagsInIndex(indexPath);
    expect(scripts).toEqual([]);
    expect(styles).toEqual([]);

    fs.rmSync(tmp, { recursive: true, force: true });
});

test("findInlineTagsInIndex - recognizes different script/style forms and ignores empty/with-src", () => {
    const tmp = makeTempDir();
    const indexPath = path.join(tmp, "index.html");
    const content = [
        "<html>",
        "<head>",
        "<SCRIPT>console.log('upper')</SCRIPT>",
        "<script type=\"module\">console.log('module')</script>",
        "<script src=\"x.js\">console.log('should be ignored')</script>",
        "<script></script>", // empty
        "<style>   </style>", // only whitespace - should be ignored
        "<style scoped>body{color:blue}</style>",
        "</head>",
        "</html>",
    ].join("\n");
    fs.writeFileSync(indexPath, content, { encoding: "utf-8" });

    const [scripts, styles] = findInlineTagsInIndex(indexPath);

    // should detect the uppercase and module scripts (2 matches)
    expect(scripts.length).toBe(2);
    expect(scripts.some(s => s[1].includes("upper"))).toBe(true);
    expect(scripts.some(s => s[1].includes("module"))).toBe(true);

    // style: the whitespace-only style should be ignored, the scoped one detected
    expect(styles.length).toBe(1);
    expect(styles[0][1]).toContain("body{color:blue}");

    fs.rmSync(tmp, { recursive: true, force: true });
});

test("findDangerousPatterns - nested directories, boundary behavior and non-matches", () => {
    const tmp = makeTempDir();

    // nested file that should match eval
    const subdir = path.join(tmp, "sub");
    fs.mkdirSync(subdir);
    fs.writeFileSync(path.join(subdir, "inner.js"), `// test\nconst x = eval(\"2+2\");\n`);

    // a file with myFunction( should NOT match
    fs.writeFileSync(path.join(tmp, "not_a_match.js"), `function myFunction() { return 1 }\n`);

    // a file with 'eval (' (space) should NOW match because regex allows whitespace
    fs.writeFileSync(path.join(tmp, "space_eval.js"), `const x = eval ("1+1");\n`);

    const matches = findDangerousPatterns(tmp);

    // inner.js should be present with relative path
    expect(matches.some(m => m[0] === path.join("sub", "inner.js"))).toBe(true);

    // not_a_match.js should NOT be present
    expect(matches.some(m => m[0] === "not_a_match.js")).toBe(false);

    // space_eval.js should NOW be present (regex allows whitespace)
    expect(matches.some(m => m[0] === "space_eval.js")).toBe(true);

    fs.rmSync(tmp, { recursive: true, force: true });
});

test("findDangerousPatterns - binary fallback respects word boundaries", () => {
    const tmp = makeTempDir();

    const binaryGood = path.join(tmp, "good.bin");
    // preceded by whitespace => should be treated as boundary
    fs.writeFileSync(binaryGood, Buffer.from([0x20, ...Buffer.from("Function(")]));

    const binaryBad = path.join(tmp, "bad.bin");
    // preceded by letter => should NOT be treated as boundary
    fs.writeFileSync(binaryBad, Buffer.from([...Buffer.from("aFunction(")]));

    const binaryEval = path.join(tmp, "eval.bin");
    // raw bytes for eval( should be detected via direct include check
    fs.writeFileSync(binaryEval, Buffer.from([0xff, 0xee, ...Buffer.from("eval(")]));

    // Force readFileSync to throw for these files when reading as text so the binary branch runs
    const originalRead = fs.readFileSync.bind(fs);
    const spy = vi.spyOn(fs, "readFileSync").mockImplementation((...args: Parameters<typeof fs.readFileSync>) => {
        const [full, opts] = args;
        if (
            typeof full === "string" &&
            (full === binaryGood || full === binaryBad || full === binaryEval) &&
            opts &&
            typeof opts === "object" &&
            "encoding" in opts &&
            (opts as { encoding?: BufferEncoding }).encoding === "utf-8"
        ) {
            throw new Error("invalid text encoding");
        }
        return originalRead(...args);
    });

    const matches = findDangerousPatterns(tmp);

    // good.bin and eval.bin should be detected via binary checks
    expect(matches.some(m => m[0] === "good.bin" && m[1] === null)).toBe(true);
    expect(matches.some(m => m[0] === "eval.bin" && m[1] === null)).toBe(true);

    // bad.bin should NOT be detected
    expect(matches.some(m => m[0] === "bad.bin")).toBe(false);

    spy.mockRestore();
    fs.rmSync(tmp, { recursive: true, force: true });
});
