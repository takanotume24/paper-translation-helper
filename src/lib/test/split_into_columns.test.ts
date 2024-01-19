import {splitIntoColumns} from '../split_into_columns'

describe('splitIntoColumns', () => {
    test('should return an empty array for an empty input array', () => {
        expect(splitIntoColumns([], 10)).toEqual([]);
    });

    test('should handle a single element', () => {
        expect(splitIntoColumns(['Hello'], 10)).toEqual([['Hello']]);
    });

    test('should split multiple sentences into columns correctly', () => {
        expect(splitIntoColumns(['Hello', 'World'], 10)).toEqual([['Hello', 'World']]);
    });

    test('should create a new column when the char limit is reached', () => {
        expect(splitIntoColumns(['Hello', 'World'], 5)).toEqual([['Hello'], ['World']]);
    });

    test('should place a long sentence in a new column', () => {
        expect(splitIntoColumns(['Hello', 'VeryVeryLongWord'], 10)).toEqual([['Hello'], ['VeryVeryLongWord']]);
    });

    test('should place a long sentence in a new column', () => {
        expect(splitIntoColumns(['VeryVeryLongWord', 'VeryVeryLongWord'], 10)).toEqual([['VeryVeryLongWord'], ['VeryVeryLongWord']]);
    });
});
