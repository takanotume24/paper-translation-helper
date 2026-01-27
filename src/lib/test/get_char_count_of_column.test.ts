import { test, expect } from "vitest";
import { get_char_count_of_column } from "../get_char_count_of_column.ts";

test("get_char_count_of_column - Should return true if the number of characters is exceeded", () => {
    const column = [
        "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
        "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
    ];
    const result = get_char_count_of_column(column);
    expect(result).toBe(120 + 151);
});
