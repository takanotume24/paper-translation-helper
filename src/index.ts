class TickInputHandler {
    static epochTicks: number = 621355968000000000;
    static ticksPerMillisecond: number = 10000;
    static maxDateMilliseconds: number = 8640000000000000; // http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1

    constructor() {
        var inputElement = document.getElementById("ticks") as HTMLInputElement;
        TickInputHandler.showResult(inputElement);
    }

    public doWork(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        if (!TickInputHandler.isTickInput(target)) {
            return;
        }

        var inputElement = target as HTMLInputElement;
        TickInputHandler.showResult(inputElement);
    }

    static showResult(inputElement: HTMLInputElement) {
        var value = TickInputHandler.getTickInputValueAsNumber(inputElement);

        var dateTimeOutput = document.getElementById("datetime");
        if (!dateTimeOutput) {
            return;
        }

        var dateString = TickInputHandler.parseTicks(value);
        if (!dateString) {
            return;
        }

        var goodParts = /([0-9]+)/g;
        var wrapParts = "<b>$1</b>";
        dateString = dateString.replace(goodParts, wrapParts);

        var firstTIndext = dateString.indexOf("T");
        var datePart = dateString.substr(0, firstTIndext);
        var timePart = dateString.substr(firstTIndext + 1);

        dateTimeOutput.innerHTML =
            datePart
            + "<span class='pad'>T</span>"
            + timePart;
    }

    static parseTicks(ticks: number) {
        if (isNaN(ticks)) {
            return "____-__-__T__:__:__.____Z";
        }

        // convert the ticks into something javascript understands
        var ticksSinceEpoch = ticks - TickInputHandler.epochTicks;
        var millisecondsSinceEpoch = ticksSinceEpoch / TickInputHandler.ticksPerMillisecond;
        if (millisecondsSinceEpoch > TickInputHandler.maxDateMilliseconds) {
            //      +035210-09-17T07:18:31.111Z
            return "9999-99-99T99:99:99:9999Z";
        }
        // output the result in something the human understands
        var date = new Date(millisecondsSinceEpoch);
        return date.toISOString();
    }

    static isTickInput(target: HTMLElement) {
        return target.tagName == 'INPUT' && target.id == 'ticks';
    }

    static getTickInputValueAsNumber(inputElement: HTMLInputElement) {
        var valueStr = inputElement.value;
        return Number(valueStr);
    }
}

window.onload = () => {
    var handler = new TickInputHandler();
    document.addEventListener("keyup", handler.doWork);
};