
import { formatAndSplitTextIntoColumns } from "../format_and_split_text_Into_columns"


describe('formatAndSplitTextIntoColumns', () => {
    // Test Text Processing
    it('should apply all text processing rules correctly', () => {
        const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz, and e.g. example.";
        const expectedResult = "This is a teststring with various rules like Fig. 1, 2.4GHz, and e.g. example.";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain(expectedResult);
    });

    // Test Edge Cases
    it('should handle empty strings', () => {
        const result = formatAndSplitTextIntoColumns('', 100);
        expect(result).toEqual([['']]);
    });

    // Test Overall Functionality
    it('should process and split text correctly', () => {
        const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz. This part will be in a separate column.";
        const charLimit = 10;
        const expectedResult = [
            ['This is a teststring with various rules like Fig. 1, 2.4GHz.'],
            ['This part will be in a separate column.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [etc. ]', () => {
        const testString = "In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making. In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.";
        const charLimit = 10;
        const expectedResult = [
            ['In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.'],
            ['In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    // Test for hyphen followed by newline
    it('should remove hyphen followed by newline', () => {
        const testString = "Test-\nString";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('TestString');
    });

    // Test for newlines replaced with spaces
    it('should replace newlines with spaces', () => {
        const testString = "Test\nString";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('Test String');
    });

    // Test for hyphens followed by a space
    it('should remove hyphens followed by a space', () => {
        const testString = "Test- String";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('TestString');
    });

    // ... (Additional tests for each replacement rule) ...

    // Test for specific frequency value
    it('should format specific frequency value', () => {
        const testString = "Frequency is 2.4 GHz";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('2.4GHz');
    });

    // Test for formatting numbers with commas
    it('should format numbers with commas', () => {
        const testString = "Figure 3.1,234 shows";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('Figure 3.1,234 shows');
    });

    // ... (Additional tests for each replacement rule) ...

    // Test for Roman numerals followed by a period
    it('should handle Roman numerals followed by a period', () => {
        const testString = "In section IV.we discuss";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('In section IV.we discuss');
    });

    // Test for number ranges
    it('should format number ranges', () => {
        const testString = "See pages 10.23-56 for more information";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('See pages 10.23-56 for more information');
    });

    // ... (Complete the tests for all the replacement rules) ...
});
