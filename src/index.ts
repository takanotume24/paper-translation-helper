class OriginalInputHandler {
    static readonly WORD_LIMIT = 4500

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
        if (!source) {
            return
        }
        source = source.replace(/-\n/g, "")
        source = source.replace(/\n/g, " ")
        source = source.replace(/- /g, "")
        source = source.replace(/Fig. /g, "Fig.")
        source = source.replace(/No. /g, "No.")
        source = source.replace(/Prof. /g, "Prof.")
        source = source.replace(/Eq. /g, "Eq.")
        source = source.replace(/et al. /g, "et al.")
        const strings = source.split(". ").map(str => `${str}.\n`)
        var results: string[][] = this.spilit_array(strings)

        console.log(results)
        converted_element.innerHTML = this.show_boxes(results)
    }

    static show_boxes(stringss: string[][]): string {
        var result = ""
        var i = 0
        stringss.forEach(strings => {
            result += this.in_box(strings.join(""), i++)
        })
        return result
    }
    static in_box(string: string, colmn_num: number): string {
        return `<li class="list-group-item"><label>No.${colmn_num}, Number of characters : ${string.length}</label><textarea class="form-control">${string}</textarea></li>`
    }

    static spilit_array(strings: string[]): string[][] {

        var char_count = 0
        var results = []
        var i = 0

        while (i < strings.length) {
            var new_array: string[] = []
            while (char_count < this.WORD_LIMIT) {
                if (i < strings.length) {
                    new_array.push(strings[i])
                    char_count += strings[i].length
                    i++
                } else {
                    break
                }
            }
            char_count = 0
            results.push(new_array)
        }
        return results
    }

}

window.onload = () => {
    var handler = new OriginalInputHandler();
    var original_element = document.getElementById("original")
    if (original_element) {
        original_element.addEventListener("keyup", handler.doWork);
    }
};