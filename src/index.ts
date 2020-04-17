class OriginalInputHandler {

    constructor() {
        var original_element = document.getElementById("original") as HTMLInputElement;
        OriginalInputHandler.showResult(original_element);
    }

    public doWork(event: KeyboardEvent) {
        const target = event.target as HTMLElement;

        var original_element = target as HTMLInputElement;
        OriginalInputHandler.showResult(original_element);
    }

    static showResult(original_element: HTMLInputElement) {

        var converted_element = document.getElementById("converted");
        if (!converted_element) {
            return;
        }

        var source = original_element.value;
        source = source.replace(/-\n/g, "")
        source = source.replace(/\n/g, " ")
        source = source.replace(/- /g, "")
        source = source.replace(/Fig. /g, "Fig.")
        source = source.replace(/No. /g, "No.")
        source = source.replace(/Prof. /g, "Prof.")
        source = source.replace(/Eq. /g, "Eq.")
        source = source.replace(/et al. /g, "et al.")
        var result_string = ""
        const strings = source.split(". ").map(str => `${str}.`)
        const WORD_LIMIT = 4500
        var word_count = 0
        strings.forEach(
            string => {
                result_string += `${string}\n`
                word_count += string.length
                if (word_count > WORD_LIMIT) {
                    result_string += `\n==================\n\n`
                    word_count = 0
                }
            }
        )
        console.log(strings)
        converted_element.innerHTML = result_string
    }

}

window.onload = () => {
    var handler = new OriginalInputHandler();
    document.addEventListener("keyup", handler.doWork);
};