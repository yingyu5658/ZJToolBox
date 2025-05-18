const {Command} = require("commander")
const Zjtb = require("./zjtb")
const zjtb = new Zjtb()

class Init {
    commandInit(command, VERSION, VERSION_INFO) {
       command
            .version(VERSION)
            .description('一个简单的命令行工具，有一些和引诱相关的实用功能\n输入"zjtb --help"来获取帮助信息',)
            .option('-a, --about', '关于')
            .option('-l, --log', '查看日志')
            .option('--noad', '禁用广告显示')
            .action((options) => {
                if (options.about) zjtb.showAbout(VERSION)
                if (options.log) zjtb.showLog()

                options.noad === true ? zjtb.showAD(false) : zjtb.showAD();
            });

       return command
    }
}

module.exports = Init