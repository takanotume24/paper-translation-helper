
import { formatAndSplitTextIntoColumns } from "../format_and_split_text_into_columns.ts";

Deno.test('formatAndSplitTextIntoColumns - should apply all text processing rules correctly', () => {
    const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz, and e.g. example.";
    const expectedResult = "This is a teststring with various rules like Fig. 1, 2.4GHz, and e.g. example.";
    const result = formatAndSplitTextIntoColumns(testString, 1000);
    if (!result.join(' ').includes(expectedResult)) {
        throw new Error("Test failed");
    }
});

Deno.test('formatAndSplitTextIntoColumns - should handle empty strings', () => {
    const result = formatAndSplitTextIntoColumns('', 100);
    if (JSON.stringify(result) !== JSON.stringify([['']])) {
        throw new Error("Test failed");
    }
});

Deno.test('formatAndSplitTextIntoColumns - should process and split text correctly', () => {
    const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz. This part will be in a separate column.";
    const charLimit = 10;
    const expectedResult = [
        ['This is a teststring with various rules like Fig. 1, 2.4GHz.'],
        ['This part will be in a separate column.']
    ];
    const result = formatAndSplitTextIntoColumns(testString, charLimit);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        throw new Error("Test failed");
    }
});

// Additional tests can be converted similarly...
