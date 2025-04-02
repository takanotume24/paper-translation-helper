import { columns } from "../type/type.ts";

export function delete_last_period(arr: columns): columns {
        const last_arr = arr.pop()
        if (!last_arr) {
            return arr
        }

        const last_word = last_arr.pop()

        if (!last_word) {
            arr.push(last_arr)
            return arr
        }

        const last_word_replaced = last_word.replace(/\.\n$/, "")

        last_arr.push(last_word_replaced)
        arr.push(last_arr)

        return arr
    }

export function delete_last_empty_string(arr: columns): columns {
        const last_arr = arr.pop()
        if (!last_arr) {
            return arr
        }

        const last_word = last_arr.pop()

        if (!last_word) {
            arr.push(last_arr)
            return arr
        }

        if (last_word === "\n" || last_word === "") {
            arr.push(last_arr)
            return arr
        }

        else {
            last_arr.push(last_word)
            arr.push(last_arr)
            return arr
        }
}
