/**
 * @file 扫描星露谷物语存档目录
 * @module StardewValley
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

const fs = require("fs")
const path = require("path");
const log = require("../Utils/GenerateLog");
const { traverseTempDir } = require("../Malody/Beatmap/ParseBeatmap");

const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

/**
 * 扫描存档目录的存档文件
 * @class ScanSaveDir
 */
class ScanSavesDir {
    /**
     * 
     * 遍历存档文件夹的所有文件，并把绝对路径存储savesList数组
     * 
     * @function
     * @param {string} userName 登录Windows系统的用户名
     * @param {string} farmeName 游戏农场名称
     * @returns {string[]} savesList 存储存档绝对路径的数组
     * @since 1.0.0
     */
    static traversePlayerSaveDir(userName, farmeName) {
        var savesList = []
        let number = 0;
        const fullPath = `C:/Users/${userName}/AppData/Roaming/StardewValley/Saves`;
        log.log(INFO, "traveserPlayerSaveDir", `文件路径：${fullPath}`, true)
        const files = fs.readdirSync(fullPath)

        try {
            files.forEach((file) => {
                const stats = fs.statSync(fullPath)
                if (stats.isDirectory()) {
                    // FIXME: 修复递归传入同一参数导致无限递归栈溢出问题
                    // FIXME: 修复递归传入同一参数导致无限递归栈溢出问题
                    // FIXME: 修复递归传入同一参数导致无限递归栈溢出问题
                    // FIXME: 修复递归传入同一参数导致无限递归栈溢出问题
                    // FIXME: 修复递归传入同一参数导致无限递归栈溢出问题
                    // 递归
                    const subList = this.traversePlayerSaveDir(userName, farmeName);
                    savesList = savesList.concat(subList);
                } else if (fullPath.includes(farmeName)) {
                    savesList.push(fullPath)
                    number++
                    log.log(INFO, "traversePlayerSaveDir", `找到了${number}个人物存档：${fullPath}`, true)
                }
            })
        } catch (error) {
            log.log(ERROR, "traversePlayerSaveDir", `遍历文件时发生错误：${error.message}`, true)
        }
        return savesList
    }
}
ScanSavesDir.traversePlayerSaveDir("yingy", "小猫乌托邦")



/* 
static traversePlayerSaveDir(userName, farmeName, currentPath = null) {
    const savesList = [];
    // 路径优先级：递归传入路径 > 用户目录生成路径
    const fullPath = currentPath || 
        path.join("C:/Users", userName, "AppData/Roaming/StardewValley/Saves");
    
    log.log(INFO, "traversePlayerSaveDir", `扫描路径：${fullPath}`, true);

    try {
        // 获取目录内容
        const files = fs.readdirSync(fullPath);
        let number = 0;

        files.forEach(file => {
            const filePath = path.join(fullPath, file);
            const stats = fs.statSync(filePath);

            // 处理子目录（递归）
            if (stats.isDirectory()) {
                const subList = this.traversePlayerSaveDir(
                    null,       // 递归时不使用用户名
                    farmeName,
                    filePath    // 传递子目录绝对路径
                );
                savesList.push(...subList);
            }
            // 处理存档文件（精确匹配）
            else if (
                file.startsWith(farmeName + "_") && 
                path.extname(file) === ".sav"
            ) {
                savesList.push(filePath);
                log.log(INFO, "traversePlayerSaveDir",
                    `找到存档 [${++number}]: ${file}`, true);
            }
        });
    } catch (error) {
        log.log(ERROR, "traversePlayerSaveDir",
            `路径 ${fullPath} 扫描失败: ${error.message}`, true);
    }

    return savesList;
}

// 调用方式（保留原始参数结构）
ScanSavesDir.traversePlayerSaveDir("yingy", "小猫乌托邦");


*/