export function add_column_to_columns(
    column: string[],
    columns: string[][],
): string[][] {
    columns.push(column)

    return columns
}
