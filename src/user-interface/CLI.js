/**
 * 命令行主文件，引导程序初始化每一条命令
 * @author yingyu5658@outlook.com
 */

const log = require('../utils/GenerateLog.js');
const {Command} = require('commander');
let zjtb = new Command();

const INFO = 'INFO';
const WARN = 'WARN';
const ERROR = 'ERROR';

/**
 * CLI命令行程序主类
 * @class
 */
class CLI {
    constructor() {}

    /**
     * 命令初始化函数
     * @param VERSION 版本号
     * @param VERSION_INFO 附加信息
     * @return 0 程序运行无异常
     * @author yingyu5658@outlook.com
     * @version 1.0.2
     */
    init(VERSION, VERSION_INFO) {
        console.log(VERSION_INFO);
        const _init = require("./command/Init")
        const init = new _init()
        zjtb = init.commandInit(zjtb, VERSION, VERSION_INFO)

        //mld子命令
        const mld = require("./command/mld")
        mld(zjtb)

        // lbl子命令
        const lbl = require("./command/lbl")
        lbl(zjtb)

        // ts子命令
        const ts = require("./command/timestamp")
        ts(zjtb)

        // bvd子命令
        const bvd = require("./command/bvd")
        bvd(zjtb)

        zjtb.parse(process.argv);
        log.info('ZJTB', 'CLI初始化完成');

        return 0
    }
}

module.exports = CLI;