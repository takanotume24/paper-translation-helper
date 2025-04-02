export function get_char_count_of_column(
    column: string[],
): number {
    let char_count = 0
    for (const sentence of column) {
        char_count += sentence.length
    }

    return char_count
}
