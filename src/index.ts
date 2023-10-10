import { Helper } from "../src/helper/helper"
import { Type } from "../src/type/type"

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
        if (this.char_limit < 1000) {
            this.char_limit = 1000
            char_limit_element.value = "1000"
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
        source = source.replace(/Fig\. /g, "Fig.")
        source = source.replace(/Figs\. /g, "Figs.")
        source = source.replace(/No\. /g, "No.")
        source = source.replace(/Prof\. /g, "Prof.")
        source = source.replace(/Eq\. /g, "Eq.")
        source = source.replace(/et al\. /g, "et al.")
        source = source.replace(/Dr\. /g, "Dr.")
        source = source.replace(/e\.g\. /g, "e.g.")
        source = source.replace(/i\.e\. /g, "i.e.")
        source = source.replace(/Sec\. /g, "Sec.")
        source = source.replace(/Sect\. /g, "Sect.")
        source = source.replace(/I\. /g, "I.")
        source = source.replace(/II\. /g, "II.")
        source = source.replace(/III\. /g, "III.")
        source = source.replace(/IV\. /g, "IV.")
        source = source.replace(/V\. /g, "V.")
        source = source.replace(/VI\. /g, "VI.")
        source = source.replace(/VII\. /g, "VII.")
        source = source.replace(/VIII\. /g, "VIII.")
        source = source.replace(/IX\. /g, "IX.")
        source = source.replace(/X\. /g, "X.")
        source = source.replace(/2\.4 GHz/g, "2.4GHz") // とりあえず
        source = source.replace(/\.[\d+](?= [A-Z])/g, "[$&]. ") //for "Neurology"
        source = source.replace(/\.[\d+,]+[\d+](?= [A-Z])/g, "[$&]. ") //for "Neurology"
        source = source.replace(/\.[\d+]–[\d+](?= [A-Z])/g, "[$&]. ") //for "Neurology", "–" is dash

        const strings = source.split(". ").map(str => `${str}.\n`)
        var results: Type.columns = this.split_array(strings)

        converted_element.innerHTML = this.show_boxes(results)
    }

    private show_boxes(stringss: Type.columns): string {
        var result = ""
        var i = 0
        stringss.forEach(strings => {
            result += this.in_box(strings.join(""), i++)
        })
        return result
    }
    
    private in_box(string: string, column_num: number): string {
        const text_area_id = `"text_area_${column_num}"`
        return `<li class="list-group-item">
            <label for=${text_area_id}>
                No.${column_num}, Number of characters : ${string.length}
            </label>
            <textarea class="form-control" id=${text_area_id}>${string}</textarea></li>`
    }

    private split_array(strings: Type.strings): Type.columns {

        var char_count = 0
        var results = []
        var i = 0

        while (i < strings.length) {
            var new_array: Type.strings = []
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
        const results_deleted_period = Helper.delete_last_period(results)
        const results_deleted_empty_string = Helper.delete_last_empty_string(results_deleted_period)
        return results_deleted_empty_string
    }
}

window.onload = () => {
    var handler = new OriginalInputHandler();
    document.getElementById("original")?.addEventListener("input", handler.doWork);
    document.getElementById("char_limit")?.addEventListener("change", handler.doWork)
};
