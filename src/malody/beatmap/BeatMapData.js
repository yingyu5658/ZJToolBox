/**
 * @file 谱面元数据数据结构
 * @module Beatmap
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

/**
 * 谱面元数据数据结构
 * @typedef BeatmapData
 */
class BeatmapData {
  /**
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.creator = "";

    /** @type {string} */
    this.title = "";

    /** @type {string} */
    this.artist = "";

    /** @type {number} */
    this.noteNumber = 0;

    /** @type {number} */
    this.bpm = 0;

    /** @type {number} */
    this.column = 0;
    
    /** @type {number} */
    this.version = "";

    /** @type {number} */
    this.lastModified     // 上一次修改时的时间戳
  }
}

module.exports = BeatmapData;
