import { createHtmlForColumns } from '../create_html_for_columns'

describe('createHtmlForColumns', () => {
    test('should return an empty string for an empty array', () => {
        const result = createHtmlForColumns([]);
        expect(result).toBe('');
    });

    test('should handle a single-element array', () => {
        const columns = [['Hello']];
        const expected =
        `<li class="list-group-item">
            <label for="text_area_0">
                No.0, Number of characters : 5
            </label>
            <textarea class="form-control" id="text_area_0">Hello</textarea>
        </li>`;
        const result = createHtmlForColumns(columns);
        expect(result).toBe(expected);
    });

    test('should handle a single-element array', () => {
        const columns = [['Hello.', 'Hello']];
        const expected =
        `<li class="list-group-item">
            <label for="text_area_0">
                No.0, Number of characters : 11
            </label>
            <textarea class="form-control" id="text_area_0">Hello.\nHello</textarea>
        </li>`;
        const result = createHtmlForColumns(columns);
        expect(result).toBe(expected);
    });

    test('should handle multiple elements in array', () => {
        const columns = [['Hello'], ['World']];
        const expected =
        `<li class="list-group-item">
            <label for="text_area_0">
                No.0, Number of characters : 5
            </label>
            <textarea class="form-control" id="text_area_0">Hello</textarea>
        </li><li class="list-group-item">
            <label for="text_area_1">
                No.1, Number of characters : 5
            </label>
            <textarea class="form-control" id="text_area_1">World</textarea>
        </li>`;
        const result = createHtmlForColumns(columns);
        expect(result).toBe(expected);
    });
});
