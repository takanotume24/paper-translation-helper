import { add_column_to_columns } from '../add_column_to_columns'

describe('add_column_to_columns', () => {
    const column = [
        "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
        "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
    ]
    const columns = [
        [
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
        ],
        [
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
        ],
    ]
    const expect_columns = [
        [
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
        ],
        [
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
        ],
        [
            "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
            "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
        ]
    ]
    test('', () => {
        expect(add_column_to_columns(column, columns)).toEqual(expect_columns);
    });
});
