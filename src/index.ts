class OriginalInputHandler {
    private char_limit: number
    constructor() {
        this.char_limit = 4500
        var original_element = document.getElementById("original") as HTMLInputElement;
        this.showResult(original_element);
    }

    public doWork = () => {
        var original_element = document.getElementById("original") as HTMLInputElement;
        this.showResult(original_element);
    }

    private showResult(original_element: HTMLInputElement) {
        const char_limit_element = document.getElementById("char_limit") as HTMLInputElement
        this.char_limit = Number(char_limit_element.value)
        if (this.char_limit < 100) {
            this.char_limit = 100
            char_limit_element.value = "100"
        }

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

    private show_boxes(stringss: string[][]): string {
        var result = ""
        var i = 0
        stringss.forEach(strings => {
            result += this.in_box(strings.join(""), i++)
        })
        return result
    }
    private in_box(string: string, colmn_num: number): string {
        const text_area_id = `"text_area_${colmn_num}"`
        return `<li class="list-group-item">
            <label for=${text_area_id}>
                No.${colmn_num}, Number of characters : ${string.length}
            </label>
            <textarea class="form-control" id=${text_area_id}>${string}</textarea></li>`
    }

    private spilit_array(strings: string[]): string[][] {

        var char_count = 0
        var results = []
        var i = 0

        while (i < strings.length) {
            var new_array: string[] = []
            while (char_count < this.char_limit) {
                if (strings.length <= i) {
                    break
                }
                if (char_count + strings[i].length > this.char_limit) {
                    break
                }
                new_array.push(strings[i])
                char_count += strings[i].length
                i++

            }
            char_count = 0
            results.push(new_array)
        }
        return results
    }

}

window.onload = () => {
    var handler = new OriginalInputHandler();
    document.getElementById("original")?.addEventListener("input", handler.doWork);
    document.getElementById("char_limit")?.addEventListener("change", handler.doWork)
};