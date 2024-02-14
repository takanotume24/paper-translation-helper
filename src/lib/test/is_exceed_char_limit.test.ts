import { is_exceed_char_limit } from '../is_exceed_char_limit'

describe('is_exceed_char_limit', () => {
    const sample = "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley. "

    test('Should return true if the number of characters is exceeded', () => {
        expect(is_exceed_char_limit(sample, 10)).toBeTruthy();
    });

    test('Should return false if the number of characters is not exceeded', () => {
        expect(is_exceed_char_limit(sample, 200)).toBeFalsy();
    });
});
