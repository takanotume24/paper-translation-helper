export function is_exceed_char_limit(
    sentences: string,
    charLimit: number,
): boolean {
    return sentences.length > charLimit
}
