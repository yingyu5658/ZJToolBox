const log = require("../../utils/GenerateLog")
const fs = require("fs")

class zjtb {
    constructor() {
    }

    showLog() {
        let log = fs.readFileSync('./Log.log', { encoding: 'utf8' }, (err) => {
            if (err) console.error(err);
        },);
        console.log(log);
    }

    showAbout(VERSION, VERSION_INFO) {
        console.log('ABOUT');
        console.log('├── Author  : yingyu5658 ');
        console.log(`├── version : ${VERSION_INFO} `);
        console.log('└── Language: Javascript ');
        console.log('作者博客：https://www.yingyu5658.me/');
    }
}

module.exports = zjtb
