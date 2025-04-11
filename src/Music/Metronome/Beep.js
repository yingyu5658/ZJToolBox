const { time } = require("console");

class Beep {

    constructor() { }

    #beepLow() {
        const childProcess = require("child_process");
        process.platform === "win32"
            ? childProcess.exec("powershell.exe [console]::beep(500,500)")
            : childProcess.exec("afplay /System/Library/Sounds/Glass.aiff");
    }
    #beepHigh() {
        const childProcess = require("child_process");
        process.platform === "win32"
            ? childProcess.exec("powershell.exe [console]::beep(1000,500)")
            : childProcess.exec("afplay /System/Library/Sounds/Glass.aiff");
    }

    #beep() {
        this.#beepHigh()
        this.#beepLow()
        this.#beepLow()
        this.#beepLow()
    }

    startMetronome(bpm) {
        const interval = 60 / bpm
        this.#beep();
        setTimeout(() => this.startMetronome(bpm), interval);
    }

}

module.exports = Beep