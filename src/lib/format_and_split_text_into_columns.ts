import { splitIntoColumns } from './split_into_columns.ts';
import { v4 } from "https://deno.land/std@0.110.0/uuid/mod.ts";

export function formatAndSplitTextIntoColumns(
    text: string,
    charLimit: number,
): string[][] {
    if (text === "") {
        return [[""]]
    }

    const dummy = v4.generate();
    text = text.replace(/\. /g, dummy)

    const replacements: [RegExp, string | ((substring: string) => string)][] = [
        [/-\n/g, ''], // Ensure hyphen followed by newline is completely removed
        [/\n/g, " "], // Replaces newlines with spaces
        [/- /g, ""], // Removes hyphens followed by a space
        [RegExp(String.raw`Fig${dummy}`, "g"), "Fig. "], // Formats abbreviation for "Figure"
        [RegExp(String.raw`Figs${dummy}`, "g"), "Figs. "], // Formats abbreviation for "Figures"
        [RegExp(String.raw`Table${dummy}`, "g"), "Table. "], // Formats abbreviation for "Table"
        [RegExp(String.raw`No${dummy}`, "g"), "No. "], // Formats abbreviation for "Number"
        [RegExp(String.raw`Prof${dummy}`, "g"), "Prof. "], // Formats abbreviation for "Professor"
        [RegExp(String.raw`Eq${dummy}`, "g"), "Eq. "], // Formats abbreviation for "Equation"
        [RegExp(String.raw`eq${dummy}`, "g"), "eq. "], // Formats abbreviation for "Equation"
        [RegExp(String.raw`et al${dummy}`, "g"), "et al. "], // Formats "et al."
        [RegExp(String.raw`Dr${dummy}`, "g"), "Dr. "], // Formats abbreviation for "Doctor"
        [RegExp(String.raw`e\.g${dummy}`, "g"), "e.g. "], // Formats "e.g."
        [RegExp(String.raw`i\.e${dummy}`, "g"), "i.e. "], // Formats "i.e."
        [RegExp(String.raw`etc${dummy}`, "g"), "etc. "], // Formats "etc."
        [RegExp(String.raw`Sec${dummy}`, "g"), "Sec. "], // Formats abbreviation for "Section"
        [RegExp(String.raw`Sect${dummy}`, "g"), "Sect. "], // Formats abbreviation for "Section"
        [RegExp(String.raw`Section${dummy}`, "g"), "Section. "], // Formats abbreviation for "Section"
        [RegExp(String.raw`vs${dummy}`, "g"), "vs. "], // Formats abbreviation for "vs."
        [RegExp(String.raw`cf${dummy}`, "g"), "cf. "], // Formats abbreviation for "cf."
        [RegExp(String.raw`2\.4 GHz`, "g"), "2.4GHz"], // Formats specific frequency value
        [RegExp(String.raw`I${dummy}`, "g"), "I. "],
        [RegExp(String.raw`II${dummy}`, "g"), "II. "],
        [RegExp(String.raw`III${dummy}`, "g"), "III. "],
        [RegExp(String.raw`IV${dummy}`, "g"), "IV. "],
        [RegExp(String.raw`V${dummy}`, "g"), "V. "],
        [RegExp(String.raw`VI${dummy}`, "g"), "VI. "],
        [RegExp(String.raw`VII${dummy}`, "g"), "VII. "],
        [RegExp(String.raw`VIII${dummy}`, "g"), "VIII. "],
        [RegExp(String.raw`IX${dummy}`, "g"), "IX. "],
        [RegExp(String.raw`X${dummy}`, "g"), "X. "],
        [RegExp(String.raw`Jan${dummy}`, "g"), "Jan. "],
        [RegExp(String.raw`Feb${dummy}`, "g"), "Feb. "],
        [RegExp(String.raw`Mar${dummy}`, "g"), "Mar. "],
        [RegExp(String.raw`Apr${dummy}`, "g"), "Apr. "],
        [RegExp(String.raw`May${dummy}`, "g"), "May. "],
        [RegExp(String.raw`Jun${dummy}`, "g"), "Jun. "],
        [RegExp(String.raw`Jul${dummy}`, "g"), "Jul. "],
        [RegExp(String.raw`Aug${dummy}`, "g"), "Aug. "],
        [RegExp(String.raw`Sep${dummy}`, "g"), "Sep. "],
        [RegExp(String.raw`Oct${dummy}`, "g"), "Oct. "],
        [RegExp(String.raw`Nov${dummy}`, "g"), "Nov. "],
        [RegExp(String.raw`Dec${dummy}`, "g"), "Dec. "],
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
