/**
 * @file 读取配置文件
 * @module config
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */


const { encode } = require("punycode")
const log = require("../utils/GenerateLog")
const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

const fs = require("fs")

class ConfigInit {
    /** @constructor */
    constructor() {}

    readConfigFileSync() {
      let tempConfigString =  fs.readFileSync("./config/config.json", {
            encoding: "utf8"
        })
      let configJson =   JSON.parse(tempConfigString)
      console.log(configJson)
      console.log(configJson[0].functionName)
    }
}

module.exports = ConfigInit