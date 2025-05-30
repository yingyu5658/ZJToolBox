/**
 * 用户交互
 * @author yingyu5658@outlook.com
 * @version 0.0.1
 */


const Mr = require('./ParseReplay.js');
const log = require('../../utils/GenerateLog.js');
const fs = require('fs');
const mr = new Mr();
const MrData = require('./MrData.js');
const mrData = new MrData();
const INT32_LENGTH = 4;
const colors = require('colors');


/**
 * 用户交互核心类
 * @class
 * @author yingyu5658@outlook.com
 * @version 1.0.0
 */
class UserInterface {
    constructor() {
    }

    /**
     * 获取全部信息
     * @param path 回放文件所在路径
     * @return {MrData} 包含所有信息的对象
     * @author yingyu5658
     * @version 1.0.0
     */
    getAllInfo(path) {
        try {
            const file = fs.readFileSync(path);
            log.info('getAllInfo', `回放文件路径：${path}`);
            const diffLength = mr.getStringLength(file, 58);
            log.info('getAllInfo', `diffLength: ${diffLength}`);
            const diff = mr.getDiff(file, diffLength);
            const beatmapNameLength = mr.getStringLength(file, diff.newOffset);
            log.info('getAllInfo', `diff.newOffset: ${diff.newOffset}`);
            const bn = mr.getBeatmapName(file, diff.newOffset, beatmapNameLength);
            const authorLength = mr.getStringLength(file, bn.newOffset);
            log.info('getAllInfo', `authorLength: ${authorLength}`);
            const finalScoreLength = INT32_LENGTH;
            const maxComboLength = INT32_LENGTH;
            const bestLength = INT32_LENGTH;
            const coolLength = INT32_LENGTH;
            const goodLength = INT32_LENGTH;
            const missLength = INT32_LENGTH;
            const judgeLength = INT32_LENGTH;
            const md5 = mr.getMD5(file);

            const author = mr.getAuthor(file, bn.newOffset, authorLength);
            const finalScore = mr.getFinalScore(
                file,
                author.newOffset,
                finalScoreLength,
            );
            const maxCombo = mr.getMaxCombo(
                file,
                finalScore.newOffset,
                maxComboLength,
            );
            const best = mr.getBest(file, maxCombo.newOffset, bestLength);
            const cool = mr.getCool(file, best.newOffset, coolLength);
            const good = mr.getGood(file, cool.newOffset, goodLength);
            const miss = mr.getMiss(file, good.newOffset, missLength);
            const judge = mr.getJudge(file, miss.newOffset, judgeLength);
            mrData.diff = diff.diff;
            mrData.beatmapName = bn.beatmapName;
            mrData.author = author.author;
            mrData.finalScore = finalScore.finalScore;
            mrData.maxCombo = maxCombo.maxCombo;
            mrData.best = best.best;
            mrData.cool = cool.cool;
            mrData.good = good.good;
            mrData.miss = miss.miss;
            mrData.judge = judge.judge;
            mrData.md5 = md5;
        } catch (error) {
            log.err('getAllInfo', `发生错误：${error}`, true);
        }
        return mrData;
    }

    /**
     * 裁剪文件名，去掉/ \
     * @param path 文件路径
     * @return {string} 最终文件名
     * @author yingyu5658
     * @version 1.0.0
     */
    cutFileName(path) {
        if (path.includes('/') || path.includes('\\') || path.includes('./') || path.includes('.')) {
            // 替换所有反斜杠为正斜杠，统一分隔符
            const normalizedPath = path.replace(/\\/g, '/');
            // 分割并获取最后一段作为文件名
            const fileName = normalizedPath.split('/');
            return fileName[fileName.length - 1];
        }
    }

    /**
     * 展示所有信息
     * @param data 包含所有信息的对象
     * @param path 回放文件路径
     * @author yingyu5658
     * @version 1.0.0
     */
    showAllInfo(data, path) {
        console.log(
            `------------------------------------------------------
${'文件名'}   | ${this.cutFileName(path)} 
---------+--------------------------------------------
${'谱面名称'} | ${data.beatmapName}
${'谱面难度'} | ${data.diff}
${'谱面作者'} | ${data.author}
${'最终得分'} | ${data.finalScore}
${'最大连击'} | ${data.maxCombo}
${'B E S T '} | ${data.best}
${'C O O L '} | ${data.cool}
${'G O O D '} | ${data.good}
${'M I S S '} | ${data.miss}
${'谱面MD5'}  | ${data.md5}`,
        );
        switch (data.judge) {
            case 'A':
                console.log(`${'使用判定 '}| ${data.judge}`);
                break;
            case 'B':
                console.log(`${'使用判定 '}| ${data.judge}`);
                break;
            case 'C':
                console.log(`${'使用判定 '}| ${data.judge}`);
                break;
            case 'D':
                console.log(`${'使用判定 '}| ${data.judge}`);
                break;
            case 'E':
                console.log(`${'使用判定 '}| ${data.judge}`);
                break;
        }
    }
}

module.exports = UserInterface;
