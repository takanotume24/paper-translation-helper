export module Helper {
    export function delete_last_period(arr: string[][]): string[][] {
        const last_arr = arr.pop()
        if (!last_arr) {
            return [[""]]
        }

        const last_word = last_arr.pop()
        const last_word_replaced = last_word?.replace(/\.$/, "")

        if (!last_word_replaced) {
            arr.push([""])
            return arr
        }

        last_arr.push(last_word_replaced)
        arr.push(last_arr)

        return arr
    }
}
