/**
 * Malody命令相关
 * @author yingyu5658@outlook.com
 * @version 0.0.1
 */

const beatmapUserInterface = require('../../malody/beatmap/UserInterface');
const ReplayUserInterface = require('../../malody/replay/UserInterface');
const replayUserInterface = new ReplayUserInterface();
const log = require('../../utils/GenerateLog.js');

module.exports = (mld) => {
    mld
        .command('mld')
        .description('Malody功能')
        .option('-b, --beatmap <filepath>', '查看Malody谱面信息。', (filePath) => {
                log.log('INFO', 'main', '执行查看谱面信息命令');
                beatmapUserInterface.main(filePath);
                return filePath;
            },
        )
        .option('-r, --replay <filePath>', '查看Malody回放信息。', (filePath) => {
            let info = replayUserInterface.getAllInfo(filePath);
            replayUserInterface.showAllInfo(info, filePath);
        });
}