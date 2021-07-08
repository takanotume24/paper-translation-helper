import { Helper } from "../src/helper/helper"

describe("Helper.delete_last_period()", () => {
    test("テストが正常に動作している", () => {
        const arr = [["hello", "world."], ["hello", "world2."]]
        const correct = [["hello", "world."], ["hello", "world2."]]
        const result = Helper.delete_last_period(arr)
        expect(result).not.toStrictEqual(correct)
    })
    test("最後のピリオドが消えるはず", () => {
        const arr = [["hello", "world."], ["hello", "world2.."]]
        const correct = [["hello", "world."], ["hello", "world2."]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
    test("最初のピリオドは消されない", () => {
        const arr = [["hello", "world.."], ["hello", "world2.."]]
        const correct = [["hello", "world.."], ["hello", "world2."]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
    test("最後にピリオドがなければ，何も変化しない", () => {
        const arr = [["hello", "world."], ["hello", "world2"]]
        const correct = [["hello", "world."], ["hello", "world2"]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("最後の配列の要素が0であれば，[[..],[\"\"]]が返る", () => {
        const arr = [["hello", "world."], []]
        const correct = [["hello", "world."], [""]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })

    test("配列の要素が0であれば，[[\"\"]]が返る", () => {
        const arr = [[]]
        const correct = [[""]]
        const result = Helper.delete_last_period(arr)
        expect(result).toStrictEqual(correct)
    })
}
)