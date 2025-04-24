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

class ParseReplay {
  static #getHead(path) {
    const offset = 3;
    try {
      let head = fs.readFileSync(path, { encoding: 'latin1' });
      if (head.includes('mr format head')) {
        log.info('ParseReplay', '文件头校验成功', true);
        return 0;
      } else {
        log.err('ParseReplay', '不是Malody回放文件', true);
        return -1;
      }
    } catch (error) {
      log.err('ParseReplay', `读取文件时发生错误：${error}`, true);
      return -1;
    }
  }

  static getReplayInfo(path) {
    if (this.#getHead(path) !== 0) {
      return -1;
    }

    let hex = fs.readFileSync('./20250121-215121-AiAe.mr');

    const headTarget = Buffer.from([0x20, 0x00, 0x00, 0x00]); // 目标序列
    let head = this.skipBlankChar(hex, headTarget);
    log.info('getReplayInfo', `头部偏移量: ${head.offset}`, true);
    log.info('getReplayInfo', `头部十六进制字符:  ${head.hex}`, true);

    const endTarget = Buffer.from([0x0b, 0x00, 0x00, 0x00]);
    let end = this.skipBlankChar(hex, endTarget);
    log.info('getReplayInfo', `尾部偏移量: ${end.offset}`, true);
    log.info('getReplayInfo', `尾部十六进制字符:  ${end.hex}`, true);

    // TODO: 读取谱面难度信息
  }

  /*
   * 读取MD5前后的空白字符，为了排除md5这个无用信息，直接读md5后面的难度信息
   * 详见Malody回放文件的结构
   */
  static skipBlankChar(buffer, target) {
    const postion = buffer.indexOf(target);
    let start = postion;
    let end = start + 4;
    let result = buffer.slice(start, end);
    let hex = result.toString('hex');
    let info = {
      offset: postion,
      hex: hex,
    };
    return info;
  }
}

module.exports = ParseReplay;
