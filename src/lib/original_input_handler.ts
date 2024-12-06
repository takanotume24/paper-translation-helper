import {formatAndSplitTextIntoColumns} from './format_and_split_text_into_columns'
import {createHtmlForColumns} from './create_html_for_columns'

export class OriginalInputHandler {
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

        const convertedText = formatAndSplitTextIntoColumns(
            source,
            this.charLimit,
        );
        const html = createHtmlForColumns(convertedText)
        this.displayConvertedText(html);
    }

    private displayConvertedText(html: string): void {
        const convertedElement = document.getElementById("converted");
        if (!convertedElement) return;

        convertedElement.innerHTML = html;
    }
}
