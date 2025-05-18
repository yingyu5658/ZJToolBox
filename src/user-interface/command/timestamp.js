/**
 * 时间戳处理相关
 * @author yingyu5658@outlook.com
 * @version 0.0.1
 */

const log = require('../../utils/GenerateLog.js');
const utils = require("../../utils/Utils")

module.exports = (ts) => {
    ts
        .command('ts')
        .description('时间戳转换工具')
        .option(
            '--conversion, -c <timestamp>',
            '把时间戳转换为YYYY-MMMM-DD hh-mm的格式',
            (timestamp) => {
                let result = utils.timeStampToTime(timestamp);
                if (result == 'ERROR') {
                    return -1;
                } else {
                    log.info('timeStampToTime', result, true);
                }
            },
        );
}