import { add_column_to_columns } from './add_column_to_columns'
import { get_char_count_of_column } from './get_char_count_of_column'


export function splitIntoColumns(
    sentences: string[],
    char_limit: number,
): string[][] {
    let columns: string[][] = [];
    let current_column: string[] = [];

    for (let sentence of sentences) {
        const expect_char_count = get_char_count_of_column(current_column) + sentence.length
        if (expect_char_count > char_limit && current_column.length != 0) {
            add_column_to_columns(current_column, columns)
            current_column = []
        }

        current_column.push(sentence)
    }

    // Push the last column if not empty
    if (current_column.length > 0) {
        columns.push(current_column);
    }

    return columns;
}
