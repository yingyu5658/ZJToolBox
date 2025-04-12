/**
 * @file 用户交互
 * @module Beatmap
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

// =========================================================================

const compressing = require("compressing");
const { exit } = require("process");
const log = require("../../utils/GenerateLog.js");
const colors = require("colors");
const ParseBeatmap = require("./ParseBeatmap.js");

const INFO = "INFO";
const ERROR = "ERROR";

/**
 * 用户交互类，负责处理用户的对功能的选择
 *
 * @class
 */
class UserInterface {
  /**
   *
   * 展示用户交互界面，供用户选择谱面
   *
   * @function
   * @param beatmapList 存储谱面列表的数组
   * @param filePath 临时文件夹路径
   * @returns 0 无错误，正常返回
   * @returns -1 出现文件错误
   * @since 1.0.0
   */
  static showBeatmapChoices(beatmapList, filePath) {
    if (beatmapList.length <= 0) {
      log.log(ERROR, "showBeatmapChoices", "错误：文件的格式似乎不对呢 ", true);
      return -1;
    }

    console.log(
      `扫描出${beatmapList.length}张谱面，请输入序号来选择要查看的谱面：`,
    );
    for (let i = 0; i < beatmapList.length; i++) {
      console.log(colors.yellow(`[${i + 1}] ${beatmapList[i]}`));
    }
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("请输入要查看的谱面的序号：", (number) => {
      const num = parseFloat(number);
      if (isNaN(num) || num < 1 || num > beatmapList.length) {
        console.log(number);
        log.log(ERROR, "showBeatmapChoices", "错误：无效的输入", true);
        exit();
      }
      // TODO: 展示谱面信息函数调用
      let data = ParseBeatmap.parseJSONFile(beatmapList[num - 1]);
      let beatmapData = ParseBeatmap.getAllData(data);
      UserInterface.showAllBeatmapData(beatmapData);
      rl.close();
    });

    return 0;
  }
  /**
   *
   * 展示全部谱面信息
   *
   * @function
   * @param beatmapData 谱面数据对象
   * @returns 0 无错误，正常返回
   * @since 1.0.0
   */
  static showAllBeatmapData(beatmapData) {
    console.log(colors.blue("===============谱面信息==============="));

    console.log(colors.blue(`标题     :${beatmapData.title}`));

    console.log(colors.blue(`谱师     :${beatmapData.creator}`));

    console.log(colors.blue(`物量     :${beatmapData.noteNumber}`));

    console.log(colors.blue(`BPM      :${beatmapData.bpm}`));

    console.log(colors.blue(`轨道数量 :${beatmapData.column}`));

    console.log(colors.blue("======================================"));

    ParseBeatmap.delTempDir();

    return 0;
  }

  /**
   *
   * 主函数
   * @returns 0 无错误，正常返回
   * @param {string} filePath mcz谱面包的路径
   * @since 1.0.0
   */
  static async main(filePath) {
    // 解压
    await ParseBeatmap.unzipMcz(filePath);
    // 遍历
    let beatmapList = [];
    beatmapList = ParseBeatmap.traverseTempDir("./temp/");
    // 展示
    UserInterface.showBeatmapChoices(beatmapList, filePath);
  }
}

module.exports = UserInterface;
