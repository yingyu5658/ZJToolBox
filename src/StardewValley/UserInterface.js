/**
 * @file 用户交互界面 
 * @module StardewValley
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

const fs = require("fs")
const path = require("path");
const log = require("../Utils/GenerateLog");
const { traverseTempDir } = require("../Malody/Beatmap/ParseBeatmap");
const readline = require("readline")

const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

/**
 * 用户交互界面
 * @class ScanSaveDir
 */

/*
分析：
首先要找到C:\Users\yingy\AppData\Roaming\StardewValley\Saves
格式：C:\Users\<UserName>\AppData\Roaming\StardewValley
1. 让用户输入用户名
2. 在完整目录获取文件夹名称，存入数组
3. 让用户选择名称，数字-1 作为索引传入数组，解析出名字为SaveGameInfo的文件
4. 解析出xml文档里的每一个标签
TODO: 用什么方法和用户交互，让用户输入数字？输入完整名称？TUI交互框架？
*/


class UserInterface {
    /**
     * 
     * 展示用户交互界面，让用户输入用户名来构建完整目录，进行下一步处理
     * 
     * @function
     * @returns {Object} 
     * @since 1.0.0
     */
    static inputUserName() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        log.log(INFO, "inputUserName", "创建IO接口成功")

        rl.question("请输入登录系统的用户名", (userName) => {
            const fullPath = `C:\\Users\\${userName}\\AppData\\Roaming\\StardewValley\\Saves\\`
            rl.close;
            return {
                fullPath: fullPath,
                userName: userName,
            }
        })
    }
}

module.exports = UserInterface

