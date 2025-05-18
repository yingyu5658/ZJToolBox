/**
 * @file 解析Malody回放十六进制文件
 * @author yingyu5658
 * @module replay
 * @version 1.0.0
 * @license MIT
 */

// =================================================

const fs = require('fs');
const log = require('../../utils/GenerateLog.js');


const MR_DATA = Buffer.from('mr data', 'utf8');
const MR_FORMAT = Buffer.from('mr format', 'utf8');
const MD5_START_OFFSET = 27;
const MD5_END_OFFSET = 58;

/**
 * 解析回放核心类
 *
 * @class
 */
class ParseReplay {
    constructor() {
    }

    /**
     * 获取字符串在回放文件中占的长度
     * @param file 文件对象
     * @param offset 目标位置的偏移量
     * @return {num}
     * @author yingyu5658
     * @version 1.0.0
     */
    getStringLength(file, offset) {
        return file.readUInt32LE(offset);
    }

    /**
     * 获取文件的MD5信息
     * @param file 文件对象
     * @return {string} MD5
     * @author yingyu5658
     * @version 1.0.0
     */
    getMD5(file,) {
        const md5 = file.toString('utf8', MD5_START_OFFSET, MD5_END_OFFSET);
        return md5;
    }

    /**
     * 获取谱面难度信息
     * @param file 谱面文件对象
     * @param length 字符串长度
     * @return {{diff: string, newOffset: *}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getDiff(file, length) {
        const diff = file.toString(
            'utf8',
            MD5_END_OFFSET + 4,
            MD5_END_OFFSET + 4 + length,
        );
        return {diff, newOffset: MD5_END_OFFSET + 4 + length};
    }

    /**
     * 获取谱面名称
     * @param file 谱面文件对象
     * @param offset 目标位置偏移量
     * @param length 字符长度
     * @return {{beatmapName: string 谱面名称, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getBeatmapName(file, offset, length) {
        const beatmapName = file.toString('utf8', offset + 4, offset + 4 + length);
        return {beatmapName, newOffset: offset + 4 + length};
    }

    /**
     * 获取谱面作者
     * @param file 文件对象
     * @param offset 目标偏移量
     * @param length 字符长度
     * @return {{author: string 作者, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getAuthor(file, offset, length) {
        const author = file.toString('utf8', offset + 4, offset + 4 + length);
        return {author, newOffset: offset + 4 + length};
    }

    /**
     * 获取最终得分
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{finalScore: number 最终得分, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getFinalScore(file, offset) {
        const finalScore = file.readUInt32LE(offset);
        return {finalScore, newOffset: offset + 4};
    }

    /**
     * 获取最大Combo
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{maxCombo: number 最大Combo, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getMaxCombo(file, offset) {
        const maxCombo = file.readUInt32LE(offset);
        return {maxCombo, newOffset: offset + 4};
    }

    /**
     * 获取Best数量
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{best: number Best数量, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getBest(file, offset) {
        const best = file.readUInt32LE(offset);
        return {best, newOffset: offset + 4};
    }

    /**
     * 获取Cool数量
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{Cool: number Cool数量, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getCool(file, offset,) {
        const cool = file.readUInt32LE(offset);
        return {cool, newOffset: offset + 4};
    }

    /**
     * 获取Good数量
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{Good: number Good数量, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getGood(file, offset,) {
        const good = file.readUInt32LE(offset);
        return {good, newOffset: offset + 4};
    }

    /**
     * 获取Miss数量
     * @param file 文件对象
     * @param offset 目标偏移量
     * @return {{Miss: number Miss数量, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getMiss(file, offset) {
        const miss = file.readUInt32LE(offset);
        return {miss, newOffset: offset + 12};
    }

    /**
     * 获取判定
     * @param file 文件对象
     * @param offset
     * @return {{judge: string 判定字母A/B/C/D/E, newOffset: number 新的偏移量}}
     * @author yingyu5658
     * @version 1.0.0
     */
    getJudge(file, offset) {
        let temp = file.readUInt32LE(offset);
        let judge = '';
        switch (temp) {
            case 0:
                judge = 'A';
                break;
            case 1:
                judge = 'B';
                break;
            case 2:
                judge = 'C';
                break;
            case 3:
                judge = 'D';
                break;
            case 4:
                judge = 'E';
                break;
        }
        return {judge, newOffset: offset + 4};
    }
}

module.exports = ParseReplay;
