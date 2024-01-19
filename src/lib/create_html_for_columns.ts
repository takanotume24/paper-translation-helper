export function createHtmlForColumns(columns: string[][]): string {
    return columns.map((column, index) =>
        `<li class="list-group-item">
            <label for="text_area_${index}">
                No.${index}, Number of characters : ${column.join("").length}
            </label>
            <textarea class="form-control" id="text_area_${index}">${column.join("\n")}</textarea>
        </li>`
    ).join("");
}
