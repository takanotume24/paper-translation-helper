export function splitIntoColumns(
    sentences: string[],
    charLimit: number,
): string[][] {
    let charCount = 0;
    let results: string[][] = [];
    let currentColumn: string[] = [];

    sentences.forEach(sentence => {
        // Check if adding this sentence exceeds charLimit or if the sentence itself exceeds charLimit
        if (charCount + sentence.length > charLimit || sentence.length > charLimit) {
            // Push currentColumn to results if it's not empty
            if (currentColumn.length > 0) {
                results.push(currentColumn);
                currentColumn = [];
            }

            // If the sentence itself exceeds charLimit, it should be in its own column
            if (sentence.length > charLimit) {
                results.push([sentence]);
                // Reset charCount as the long sentence is placed in its own column
                charCount = 0;
                return; // Continue to next sentence
            }
        }

        currentColumn.push(sentence);
        charCount += sentence.length;
    });

    // Push the last column if not empty
    if (currentColumn.length > 0) {
        results.push(currentColumn);
    }

    return results;
}
