import { Helper } from "../helper.ts";
import { Type } from "../../type/type.ts";

Deno.test("Helper.delete_last_period() - テストが正常に動作している", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2.\n"]];
    const correct = [["hello", "world.\n"], ["hello", "world2.\n"]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) === JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - 最後のピリオドが消えるはず", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2..\n"]];
    const correct = [["hello", "world.\n"], ["hello", "world2."]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - 最初のピリオドは消されない", () => {
    const arr = [["hello", "world..\n"], ["hello", "world2..\n"]];
    const correct = [["hello", "world..\n"], ["hello", "world2."]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - 最後にピリオドがなければ，何も変化しない", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2"]];
    const correct = [["hello", "world.\n"], ["hello", "world2"]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - 最後の配列の要素が0であれば，その要素は消滅しない", () => {
    const arr = [["hello", "world.\n"], []];
    const correct = [["hello", "world.\n"], []];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - 配列の要素が0であれば，[[\"\"]]が返る", () => {
    const arr = [[]];
    const correct = [[]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - []であれば，[]が返る", () => {
    const arr: Type.columns = [];
    const correct: Type.columns = [];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - [[\".\\n\"]]であれば，[[\"\"]]が返る", () => {
    const arr = [[".\n"]];
    const correct = [[""]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_period() - [[\\n]]]であれば，[[\\n]]が返る", () => {
    const arr = [["\n"]];
    const correct = [["\n"]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - テストが正常に動作している", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2.\n"], [""]];
    const correct = [["hello", "world.\n"], ["hello", "world2.\n"], [""]];
    const result = Helper.delete_last_empty_string(arr);
    if (JSON.stringify(result) === JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - 最後の改行が消滅する", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2.\n"], ["\n"]];
    const correct = [["hello", "world.\n"], ["hello", "world2.\n"], []];
    const result = Helper.delete_last_empty_string(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - 最後の\"\"が消滅する", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2.\n"], [""]];
    const correct = [["hello", "world.\n"], ["hello", "world2.\n"], []];
    const result = Helper.delete_last_empty_string(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - 最後の要素に中身があれば，消滅しない", () => {
    const arr = [["hello", "world.\n"], ["hello", "world2.\n"], ["hello"]];
    const correct = [["hello", "world.\n"], ["hello", "world2.\n"], ["hello"]];
    const result = Helper.delete_last_empty_string(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - 最後の配列の要素が0であれば，[[..],[\"\"]]が返る", () => {
    const arr = [["hello", "world.\n"], []];
    const correct = [["hello", "world.\n"], []];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - [[]]であれば，[[]]が返る", () => {
    const arr = [[]];
    const correct = [[]];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});

Deno.test("Helper.delete_last_empty_string() - 配列の要素が0であれば，[[]]が返る", () => {
    const arr: Type.columns = [];
    const correct: Type.columns = [];
    const result = Helper.delete_last_period(arr);
    if (JSON.stringify(result) !== JSON.stringify(correct)) {
        throw new Error("Test failed");
    }
});
