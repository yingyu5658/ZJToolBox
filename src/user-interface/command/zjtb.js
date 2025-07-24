const log = require("../../utils/GenerateLog")
const fs = require("fs")

class zjtb {
    constructor() {
    }

    showAbout(VERSION, VERSION_INFO) {
        console.log('ABOUT');
        console.log('├── Author  : yingyu5658 ');
        console.log(`├── version : ${VERSION_INFO} `);
        console.log('└── Language: Javascript ');
    }
}

module.exports = zjtb
