import { splitIntoColumns } from './split_into_columns'
import { v4 as uuidv4 } from 'uuid';

export function formatAndSplitTextIntoColumns(
    text: string,
    charLimit: number,
): string[][] {
    if (text === "") {
        return [[""]]
    }

    const dummy = uuidv4()
    text = text.replace(/\. /g, dummy)

    const replacements: [RegExp, string | ((substring: string) => string)][] = [
        [/-\n/g, ''], // Ensure hyphen followed by newline is completely removed
        [/\n/g, " "], // Replaces newlines with spaces
        [/- /g, ""], // Removes hyphens followed by a space
        [RegExp(`Fig${dummy}`, "g"), "Fig. "], // Formats abbreviation for "Figure"
        [RegExp(`Figs${dummy}`, "g"), "Figs. "], // Formats abbreviation for "Figures"
        [RegExp(`No${dummy}`, "g"), "No. "], // Formats abbreviation for "Number"
        [RegExp(`Prof${dummy}`, "g"), "Prof. "], // Formats abbreviation for "Professor"
        [RegExp(`Eq${dummy}`, "g"), "Eq. "], // Formats abbreviation for "Equation"
        [RegExp(`et al${dummy}`, "g"), "et al. "], // Formats "et al."
        [RegExp(`Dr${dummy}`, "g"), "Dr. "], // Formats abbreviation for "Doctor"
        [RegExp(`e\.g${dummy}`, "g"), "e.g. "], // Formats "e.g."
        [RegExp(`i\.e${dummy}`, "g"), "i.e. "], // Formats "i.e."
        [RegExp(`Sec${dummy}`, "g"), "Sec. "], // Formats abbreviation for "Section"
        [RegExp(`Sect${dummy}`, "g"), "Sect. "], // Formats abbreviation for "Section"
        [RegExp(`2\.4 GHz`, "g"), "2.4GHz"], // Formats specific frequency value
        [RegExp(`I${dummy}`, "g"), "I. "],
        [RegExp(`II${dummy}`, "g"), "II. "],
        [RegExp(`III${dummy}`, "g"), "III. "],
        [RegExp(`IV${dummy}`, "g"), "IV. "],
        [RegExp(`V${dummy}`, "g"), "V. "],
        [RegExp(`VI${dummy}`, "g"), "VI. "],
        [RegExp(`VII${dummy}`, "g"), "VII. "],
        [RegExp(`VIII${dummy}`, "g"), "VIII. "],
        [RegExp(`IX${dummy}`, "g"), "IX. "],
        [RegExp(`X${dummy}`, "g"), "X. "],
        [/\.\d+,\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats numbers with commas
        [/\.\d+-\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats number ranges
    ];

    // Process replacements
    let processedText = text;
    replacements.forEach(([regex, replacement]) => {
        processedText = processedText.replace(regex, (match) => typeof replacement === "function" ? replacement(match) : replacement);
    });

    // Split the processed text into sentences
    let sentences = processedText.split(RegExp(`${dummy}`, "s"));

    sentences = sentences.map(item => {
        if (!item.endsWith('.')) {
            return item + '.';
        }
        return item;
    });
    // Use the splitIntoColumns function to split the sentences into columns
    return splitIntoColumns(sentences, charLimit);
}
