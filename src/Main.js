/**
 * 主类，启动命令行程序，开始计时
 * @author yingyu5658@outlook.com
 */

const startTime = process.hrtime()
const log = require('./utils/GenerateLog.js');
const CLI = require('./user-interface/CLI.js');
const VERSION = '1.4.1';
const VERSION_INFO =
    String.raw
        ` _____   _ _____           _ ____
|__  /  | |_   _|__   ___ | | __ )  _____  __
  / /_  | | | |/ _ \ / _ \| |  _ \ / _ \ \/ /
 / /| |_| | | | (_) | (_) | | |_) | (_) >  <
/____\___/  |_|\___/ \___/|_|____/ \___/_/\_\
ZJTB @${VERSION}`;
const cli = new CLI();
cli.init(VERSION, VERSION_INFO);
log.log('INFO', 'Main', '程序执行结束');
const diff = process.hrtime(startTime)
const nanoseconds = diff[0] * 1e9 + diff[1]
const time = nanoseconds / 1e6
log.info('Main', `程序结束，总用时：${time} ms`);
