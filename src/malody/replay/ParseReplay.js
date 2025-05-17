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

/**
 * 解析回放核心类
 *
 * @class
 */

const MR_DATA = Buffer.from('mr data', 'utf8');
const MR_FORMAT = Buffer.from('mr format', 'utf8');
const MD5_START_OFFSET = 27;
const MD5_END_OFFSET = 58;

class ParseReplay {
  constructor() {}

  getStringLength(file, offset) {
    return file.readUInt32LE(offset);
  }

  getMD5(file, length) {
    const md5 = file.toString('utf8', MD5_START_OFFSET, MD5_END_OFFSET);
    return md5;
  }

  getDiff(file, length) {
    const diff = file.toString(
      'utf8',
      MD5_END_OFFSET + 4,
      MD5_END_OFFSET + 4 + length,
    );
    return { diff, newOffset: MD5_END_OFFSET + 4 + length };
  }

  getBeatmapName(file, offset, length) {
    const beatmapName = file.toString('utf8', offset + 4, offset + 4 + length);
    return { beatmapName, newOffset: offset + 4 + length };
  }

  getAuthor(file, offset, length) {
    const author = file.toString('utf8', offset + 4, offset + 4 + length);
    return { author, newOffset: offset + 4 + length };
  }

  getFinalScore(file, offset, length) {
    const finalScore = file.readUInt32LE(offset);
    return { finalScore, newOffset: offset + 4 };
  }

  getMaxCombo(file, offset, length) {
    const maxCombo = file.readUInt32LE(offset);
    return { maxCombo, newOffset: offset + 4 };
  }

  getBest(file, offset, length) {
    const best = file.readUInt32LE(offset);
    return { best, newOffset: offset + 4 };
  }

  getCool(file, offset, length) {
    const cool = file.readUInt32LE(offset);
    return { cool, newOffset: offset + 4 };
  }

  getGood(file, offset, length) {
    const good = file.readUInt32LE(offset);
    return { good, newOffset: offset + 4 };
  }

  getMiss(file, offset, length) {
    const miss = file.readUInt32LE(offset);
    return { miss, newOffset: offset + 12 };
  }

  getJudge(file, offset, length) {
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
    return { judge, newOffset: offset + 4 };
  }
}

module.exports = ParseReplay;
