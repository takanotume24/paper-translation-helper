import { get_char_count_of_column } from '../get_char_count_of_column'

describe('get_char_count_of_column', () => {
    const column = [
        "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
        "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
    ]
    test('Should return true if the number of characters is exceeded', () => {
        expect(get_char_count_of_column(column)).toEqual(120 + 151);
    });
});
