class OriginalInputHandler {
    private charLimit = 4500;

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        window.onload = () => {
            const originalElement = document.getElementById("original");
            const charLimitElement = document.getElementById("char_limit");

            originalElement?.addEventListener("input", this.handleInput);
            charLimitElement?.addEventListener("change", this.handleInput);
        };
    }

    private handleInput = (): void => {
        const originalElement = document.getElementById("original") as HTMLInputElement | null;
        const charLimitElement = document.getElementById("char_limit") as HTMLInputElement | null;

        if (!originalElement || !charLimitElement) return;

        this.charLimit = Math.max(Number(charLimitElement.value), 1000);
        charLimitElement.value = this.charLimit.toString();

        const source = originalElement.value;
        if (!source) return;

        const convertedText = this.processText(source);
        this.displayConvertedText(convertedText);
    }

    private processText(text: string): string {
        const replacements: [RegExp, string | ((substring: string) => string)][] = [
        [/-\n/g, ""], // Removes hyphen followed by a newline
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
            [/[IVXLCDM]+\.\s/g, match => match.trim() + ". "], // Formats Roman numerals followed by a period
            [/\.\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats decimal numbers followed by an uppercase letter
            [/\.\d+,\d+(?= [A-Z])/g, match => "[" + match + "]. "], // Formats numbers with commas
            [/\.\d+–\d+(?= [A-Z])/g, match => "[" + match + "]. "] // Formats number ranges
    
        ];
    
        let processedText = text;
        replacements.forEach(([regex, replacement]) => {
            if (typeof replacement === "function") {
                processedText = processedText.replace(regex, replacement);
            } else {
                processedText = processedText.replace(regex, replacement);
            }
        });
    
        const sentences = processedText.split(". ").map(str => `${str}.\n`);
        const formattedText = this.splitIntoColumns(sentences);
    
        return this.createHtmlForColumns(formattedText);
    }
    

    private splitIntoColumns(sentences: string[]): string[][] {
        let charCount = 0;
        let results: string[][] = [];
        let currentColumn: string[] = [];

        sentences.forEach(sentence => {
            if (charCount + sentence.length > this.charLimit) {
                results.push(currentColumn);
                currentColumn = [];
                charCount = 0;
            }

            currentColumn.push(sentence);
            charCount += sentence.length;
        });

        if (currentColumn.length > 0) {
            results.push(currentColumn);
        }

        return results;
    }

    private createHtmlForColumns(columns: string[][]): string {
        return columns.map((column, index) => 
            `<li class="list-group-item">
                <label for="text_area_${index}">
                    No.${index}, Number of characters : ${column.join("").length}
                </label>
                <textarea class="form-control" id="text_area_${index}">${column.join("")}</textarea>
            </li>`
        ).join("");
    }

    private displayConvertedText(html: string): void {
        const convertedElement = document.getElementById("converted");
        if (!convertedElement) return;

        convertedElement.innerHTML = html;
    }
}

new OriginalInputHandler();
