/**
 * @file 版本信息结构
 * @module Beatmap
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

/**
 * 版本信息数据结构
 * @typedef Version
 */
class Version {
    constructor() {
        /** @type {string} 版本号 */
        this.version = ""

        /** @type {string} 发布日期 */
        this.date = ""
    }
}

module.exports = Version