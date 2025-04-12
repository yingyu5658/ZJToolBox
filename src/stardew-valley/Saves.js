/**
 * @file 处理存档，解析xml文档标签
 * @module StardewValley
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

const fs = require("fs")
const log = require("../Utils/GenerateLog")

const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

/**
 * 处理存档，解析xml文档标签
 * @class Saves 
 */
class Saves {
    /**
     * @constructor
     */
    constructor() { }

/**
 * 
 * 查找存档目录下的存档文件夹
 * 
 * @param {string} fullPath 
 * @returns {string} fileName[] 存档文件（夹）名
 */
    readSavesDir(fullPath) {
        try {

            const fileList = fs.readdirSync(fullPath)
            let  fileName = []

            for (let i = 0; i < fileList.length; i++) {
                if (!fileList[i].includes(".vcf")) {
                     fileName.push(fileList[i])
                    log.log(INFO, "readSavesDir", `找到了文件：${fileList[i]}`, true)
                }
            }
            return fileName 
        } catch (error) {
            log.log(ERROR, "readSavesDir", `搜索文件时发生错误：${error}`, true)
        }
    }
}
module.exports = Saves


