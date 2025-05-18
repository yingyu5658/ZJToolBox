const log = require("../../utils/GenerateLog")
const fs = require("fs")

class zjtb {
    constructor() {
    }

    showLog() {
        let log = fs.readFileSync('./Log.log', {encoding: 'utf8'}, (err) => {
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

    showAD(isShow) {
           if (isShow === false) return;
           console.log(`
   |============================|
   |            广告            |
   |----------------------------|
   |    加入醉酒哈基米谢谢喵    |
   |         591067249          |
   |----------------------------|
   |访问yingyu5658的万事屋谢谢喵|
   | https://www.yingyu5658.me  |
   |============================|
   `,
           );
           log.info('AD', '广告投放完成', false);
       }
}

module.exports = zjtb