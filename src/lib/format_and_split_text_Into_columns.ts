import {splitIntoColumns} from './split_into_columns'

export function formatAndSplitTextIntoColumns(
    text: string,
    charLimit: number,
): string[][] {
    const replacements: [RegExp, string | ((substring: string) => string)][] = [
        [/-\n/g, ''], // Ensure hyphen followed by newline is completely removed
        [/\n/g, " "], // Replaces newlines with spaces
        [/- /g, ""], // Removes hyphens followed by a space
        [/Fig\. /g, "Fig."], // Formats abbreviation for "Figure"
        [/Figs\. /g, "Figs."], // Formats abbreviation for "Figures"
        [/No\. /g, "No."], // Formats abbreviation for "Number"
        [/Prof\. /g, "Prof."], // Formats abbreviation for "Professor"
        [/Eq\. /g, "Eq."], // Formats abbreviation for "Equation"
        [/et al\. /g, "et al."], // Formats "et al."
        [/Dr\. /g, "Dr."], // Formats abbreviation for "Doctor"
        [/e\.g\. /g, "e.g."], // Formats "e.g."
        [/i\.e\. /g, "i.e."], // Formats "i.e."
        [/Sec\. /g, "Sec."], // Formats abbreviation for "Section"
        [/Sect\. /g, "Sect."], // Formats abbreviation for "Section"
        [/2\.4 GHz/g, "2.4GHz"], // Formats specific frequency value
        [/I\. /g, "I."],
        [/II\. /g, "II."],
        [/III\. /g, "III."],
        [/IV\. /g, "IV."],
        [/V\. /g, "V."],
        [/VI\. /g, "VI."],
        [/VII\. /g, "VII."],
        [/VIII\. /g, "VIII."],
        [/IX\. /g, "IX."],
        [/X\. /g, "X."],
        [/\.\d+,\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats numbers with commas
        [/\.\d+-\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats number ranges
    ];

    // Process replacements
    let processedText = text;
    replacements.forEach(([regex, replacement]) => {
        processedText = processedText.replace(regex, (match) => typeof replacement === "function" ? replacement(match) : replacement);
    });

    // Split the processed text into sentences
    const sentences = processedText.split(/(?<=\.)\s/);

    // Use the splitIntoColumns function to split the sentences into columns
    return splitIntoColumns(sentences, charLimit);
}
