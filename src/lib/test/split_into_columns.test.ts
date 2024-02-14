import { splitIntoColumns } from '../split_into_columns'

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

    test('Should be able to split every 1000 characters.', () => {
        const sample = [
            "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
            "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
            "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
            "In this village, there lived a young dreamer named Elian.",
            "Elian was known throughout the village for his curious mind and his relentless pursuit of knowledge.",
            "He spent his days wandering the forests, studying the stars, and reading every book he could get his hands on.",
            "Elian's thirst for understanding the world was unquenchable, and his fellow villagers often marveled at his passion.",
            "One day, while exploring the edge of the forest, Elian stumbled upon a hidden glen that he had never seen before.",
            "In the center of the glen stood a magnificent tree, its branches reaching toward the heavens as if in silent prayer.",
            "The tree was unlike any Elian had ever seen, its leaves shimmering with a golden hue and its trunk radiating a gentle warmth.",
            "Drawn to the tree's beauty and mystery, Elian approached it with a sense of awe.",
            "As he touched the bark, a gentle voice echoed in his mind, telling him of ancient wisdom and forgotten truths.",
            "The tree, as it turned out, was the Guardian of the Valley, a mystical entity that had watched over the land for centuries.",
            "The Guardian spoke to Elian of the delicate balance of nature and the importance of living in harmony with the earth.",
            "It told him of the challenges the valley and the world beyond faced, from the encroachment of dark forces to the perils of forgetting the lessons of the past.",
            "Inspired by the Guardian's words, Elian vowed to protect the valley and spread its message of balance and harmony.",
            "He returned to the village with a newfound sense of purpose, eager to share the wisdom he had received.",
            "The villagers listened intently as Elian spoke of his encounter with the Guardian and the lessons it had imparted.",
            "Motivated by Elian's passion and the urgency of the Guardian's message, the villagers joined together to safeguard their home.",
            "They implemented sustainable practices to preserve the land, fostered a deeper connection with nature, and shared their knowledge with neighboring communities.",
            "As the years passed, the village flourished, becoming a beacon of hope and a testament to the power of unity and respect for the natural world.",
            "Elian continued to explore and learn, his spirit forever guided by the wisdom of the Guardian.",
            "And though challenges arose, the villagers faced them with courage and determination, their bonds strengthened by the trials they overcame together.",
            "In this way, the village in the valley remained a haven of peace and prosperity, a place where the legacy of the Guardian lived on through the actions of its people.",
            "And Elian, the young dreamer who had once sought to understand the world, found that the greatest lessons came from listening to the earth and protecting the balance of all living things."
        ]
        const char_limit = 1000
        const expect_result = [
            [
                "Once upon a time in a distant land, there was a peaceful village nestled in the heart of a lush valley.",
                "Surrounded by towering mountains, the village was a haven for those who sought tranquility and a connection with nature.",
                "The villagers, a mix of farmers, artisans, and scholars, lived in harmony with the land, drawing sustenance and inspiration from the earth and the sky.",
                "In this village, there lived a young dreamer named Elian.",
                "Elian was known throughout the village for his curious mind and his relentless pursuit of knowledge.",
                "He spent his days wandering the forests, studying the stars, and reading every book he could get his hands on.",
                "Elian's thirst for understanding the world was unquenchable, and his fellow villagers often marveled at his passion.",
                "One day, while exploring the edge of the forest, Elian stumbled upon a hidden glen that he had never seen before.",
                "In the center of the glen stood a magnificent tree, its branches reaching toward the heavens as if in silent prayer.",
            ], [
                "The tree was unlike any Elian had ever seen, its leaves shimmering with a golden hue and its trunk radiating a gentle warmth.",
                "Drawn to the tree's beauty and mystery, Elian approached it with a sense of awe.",
                "As he touched the bark, a gentle voice echoed in his mind, telling him of ancient wisdom and forgotten truths.",
                "The tree, as it turned out, was the Guardian of the Valley, a mystical entity that had watched over the land for centuries.",
                "The Guardian spoke to Elian of the delicate balance of nature and the importance of living in harmony with the earth.",
                "It told him of the challenges the valley and the world beyond faced, from the encroachment of dark forces to the perils of forgetting the lessons of the past.",
                "Inspired by the Guardian's words, Elian vowed to protect the valley and spread its message of balance and harmony.",
                "He returned to the village with a newfound sense of purpose, eager to share the wisdom he had received.",
            ], [
                "The villagers listened intently as Elian spoke of his encounter with the Guardian and the lessons it had imparted.",
                "Motivated by Elian's passion and the urgency of the Guardian's message, the villagers joined together to safeguard their home.",
                "They implemented sustainable practices to preserve the land, fostered a deeper connection with nature, and shared their knowledge with neighboring communities.",
                "As the years passed, the village flourished, becoming a beacon of hope and a testament to the power of unity and respect for the natural world.",
                "Elian continued to explore and learn, his spirit forever guided by the wisdom of the Guardian.",
                "And though challenges arose, the villagers faced them with courage and determination, their bonds strengthened by the trials they overcame together.",
                "In this way, the village in the valley remained a haven of peace and prosperity, a place where the legacy of the Guardian lived on through the actions of its people.",
            ], [
                "And Elian, the young dreamer who had once sought to understand the world, found that the greatest lessons came from listening to the earth and protecting the balance of all living things.",
            ]
        ]
        expect(splitIntoColumns(sample, char_limit)).toEqual(expect_result);
    });
});
