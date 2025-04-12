/**
 * @file 解析谱面信息
 * @module Beatmap
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

// =========================================================================

const compressing = require("compressing");
const path = require("path");
const fs = require("fs");
const log = require("../../utils/GenerateLog.js");
const BeatmapData = require("./BeatMapData.js");

const INFO = "INFO";
const ERROR = "ERROR";

/**
 * 解析谱面核心类，职责：
 * - 解压.mcz谱面包到临时路径
 * - 遍历临时路径查找.mc文件
 * - 读取.mc文件，存入标准数据结构BeatmapData
 *
 * @class
 */
class ParseBeatmap {
  /**
   *
   * 把.mcz谱面包解压到临时路径
   *
   * @function
   * @param {string} filePath  .mcz谱面包的路径
   * @throws {Error} 当文件不存在、解压过程出错、无权限时抛出
   * @since 1.0.0
   */
  static async unzipMcz(filePath) {
    try {
      await compressing.zip.uncompress(filePath, "./temp", {
        zipFileNameEncoding: "UTF-8",
      });
    } catch (err) {
      log.log(ERROR, "UnzipBeatmap", `解压谱面时发生错误${err.message}`);
    }
  }

  /**
   *
   * 遍历临时目录是否有.mc文件并把绝对路径存入beatmapList数组
   *
   * @function
   * @param {string} dirPath 临时目录路径，默认./temp
   * @returns {string[]} 存储.mc谱面文件绝对路径的数组
   * @since 1.0.0
   */
  static traverseTempDir(dirPath = "./temp/") {
    // 存储谱面列表
    var beatmapList = [];
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // 递归调用并合并子目录结果
        const subList = ParseBeatmap.traverseTempDir(filePath);
        beatmapList = beatmapList.concat(subList);
      } else if (filePath.endsWith(".mc")) {
        beatmapList.push(filePath);
        log.log(INFO, "traverseTempDir", `找到谱面: ${filePath}`, true);
      }
    });
    return beatmapList;
  }

  /**
   *
   * 读取谱面文件并解析json字符串为对象
   *
   * @function
   * @param {string} filePath .mc文件的绝对路径
   * @throws err 当.mc文件不存在、无读写权限时抛出
   * @returns {Object} data .mc文件完整对象，包含所有键
   * @returns null 发生错误时返回
   * @since 1.0.0
   */
  static parseJSONFile(filePath) {
    try {
      // 读取谱面文件
      const rawData = fs.readFileSync(filePath);

      // 解析json字符串为对象
      const data = JSON.parse(rawData);
      log.log(INFO, "getBeatmapFileData", "谱面解析成功！", true);
      return data;
    } catch (err) {
      log.log(
        ERROR,
        "getBeatmapFileData",
        `谱面解析失败：${err.message}`,
        true,
      );
      return null;
    }
  }

  /**
   *
   * 获取.mc文件json对象中的所有有用属性
   *
   * @function
   * @param {Object} data json对象
   * @returns {Object} beatmapData 包含所有有用属性的BeatmapData对象
   * @since 1.0.0
   */
  static getAllData(data) {
    const beatmapData = new BeatmapData();
    beatmapData.title = data.meta?.song?.title;
    beatmapData.creator = data.meta?.creator;
    beatmapData.noteNumber = data.note?.length;
    beatmapData.column = data.meta?.mode_ext.column;
    beatmapData.bpm = data.time.map((t) => t.bpm);

    return beatmapData;
  }

  /**
   *
   * 删除临时目录
   *
   * @function
   * @param {string} tempDirPath 默认为./temp/
   * @returns 0 无错误，正常返回
   * @since 1.0.0
   */
  static delTempDir(tempDirPath = "./temp/") {
    fs.rm(
      tempDirPath,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          log.log(
            ERROR,
            "delTempDir",
            "删除临时目录时失败，请手动删除" + err,
            true,
          );
        }
      },
    );
    log.log(INFO, "delTempDir", "删除临时目录成功！", true);
    return 0;
  }
}

module.exports = ParseBeatmap;
