import { Helper } from "../helper"
import { Type } from "../../type/type"

describe("Helper.delete_last_period()", () => {
    test("テストが正常に動作している", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2.\n"]]
        const correct = [["hello", "world.\n"], ["hello", "world2.\n"]]
        const result = Helper.delete_last_period(arr)
        expect(result).not.toStrictEqual(correct)
    })
    test("最後のピリオドが消えるはず", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2..\n"]]
        const correct = [["hello", "world.\n"], ["hello", "world2."]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
    test("最初のピリオドは消されない", () => {
        const arr = [["hello", "world..\n"], ["hello", "world2..\n"]]
        const correct = [["hello", "world..\n"], ["hello", "world2."]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
    test("最後にピリオドがなければ，何も変化しない", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2"]]
        const correct = [["hello", "world.\n"], ["hello", "world2"]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("最後の配列の要素が0であれば，その要素は消滅しない", () => {
        const arr = [["hello", "world.\n"], []]
        const correct = [["hello", "world.\n"], []]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("配列の要素が0であれば，[[\"\"]]が返る", () => {
        const arr = [[]]
        const correct = [[]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("[]であれば，[]が返る", () => {
        const arr: Type.columns = []
        const correct: Type.columns = []
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("[[\".\\n\"]]であれば，[[\"\"]]が返る", () => {
        const arr = [[".\n"]]
        const correct = [[""]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("[[\\n]]]であれば，[[\\n]]が返る", () => {
        const arr = [["\n"]]
        const correct = [["\n"]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
}
)

describe("Helper.delete_last_empty_string()", () => {
    test("テストが正常に動作している", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2.\n"], [""]]
        const correct = [["hello", "world.\n"], ["hello", "world2.\n"], [""]]
        const result = Helper.delete_last_empty_string(arr)
        expect(result).not.toStrictEqual(correct)
    })
    test("最後の改行が消滅する", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2.\n"], ["\n"]]
        const correct = [["hello", "world.\n"], ["hello", "world2.\n"], []]
        const result = Helper.delete_last_empty_string(arr)
        expect(result).toStrictEqual(correct)
    })

    test("最後の\"\"が消滅する", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2.\n"], [""]]
        const correct = [["hello", "world.\n"], ["hello", "world2.\n"], []]
        const result = Helper.delete_last_empty_string(arr)
        expect(result).toStrictEqual(correct)
    })

    test("最後の要素に中身があれば，消滅しない", () => {
        const arr = [["hello", "world.\n"], ["hello", "world2.\n"], ["hello"]]
        const correct = [["hello", "world.\n"], ["hello", "world2.\n"], ["hello"]]
        const result = Helper.delete_last_empty_string(arr)
        expect(result).toStrictEqual(correct)
    })

    test("最後の配列の要素が0であれば，[[..],[\"\"]]が返る", () => {
        const arr = [["hello", "world.\n"], []]
        const correct = [["hello", "world.\n"], []]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("[[]]であれば，[[]]が返る", () => {
        const arr = [[]]
        const correct = [[]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("配列の要素が0であれば，[[]]が返る", () => {
        const arr: Type.columns = []
        const correct: Type.columns = []
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
}
)
