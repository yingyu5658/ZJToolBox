const log = require('./utils/GenerateLog.js');

const CLI = require('./user-interface/CLI.js');
const VERSION = '1.4.0';
const VERSION_INFO = `ZJTB @${VERSION}`;

let cli = new CLI();
cli.init(VERSION, VERSION_INFO);
log.log('INFO', 'Main', '程序执行完毕');
