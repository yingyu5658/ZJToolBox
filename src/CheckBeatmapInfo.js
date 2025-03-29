const fs = require("fs");
const log = require("./GenerateLog");
const colors = require("colors");
const { get } = require("https");
class CheckBeatmapInfo {
  constructor() {
    this.filePath = "./beatmaps/beatmap.json";
    this.data = this.constructor.CheackBeatmapFile(this.filePath);
  }

  static calcNoteNumber(data, filePath) {
    log.log("INFO", "CheackBeatmapInfo", "执行calcNoteNumber函数");

    try {
      // 同步读取文件内容
      const rawData_note = fs.readFileSync(filePath, "utf8");
      log.log("INFO", "calcNoteNumber", "读取谱面文件成功");

      // 解析json字符串为对象
      const data_note = JSON.parse(rawData_note);
      log.log("INFO", "calcNoteNumber", "解析谱面文件成功");
    } catch (err) {
      log.log("ERROR", "calcNoteNumber", "读取谱面文件失败" + err, true);
      return -1;
    }
    log.log("INFO", "CheackBeatmapInfo", "退出calcNoteNumber函数");
    return data.note?.length || 0;
  }

  static showBeatmapInfo(filePath) {
    log.log("INFO", "showBeatmapInfo", "进入showBeatMap函数");
    try {
      // 同步读取文件内容
      const rawData = fs.readFileSync(filePath, "utf8");
      log.log("INFO", "showBeatmapInfo", "读取谱面文件成功");

      // 解析json字符串为对象
      const data = JSON.parse(rawData);
      log.log("INFO", "showBeatmapInfo", "解析谱面文件成功");

      // ===========================提取目标字段==============================
      // 谱师
      const creator = data.meta?.creator;
      // 歌曲标题
      const title = data.meta?.song?.title;
      // 曲师
      const artist = data.meta?.song?.artist;
      // 物量
      const resultNoteNumber = CheckBeatmapInfo.calcNoteNumber(data, filePath);
      // BPM
      const bpm = CheckBeatmapInfo.getMusicBpm(data);
      // 轨道数量
      const column = data.meta.mode_ext.column;
      // =======================================================================

      log.log("INFO", "CheackBeatmapinfo", "提取目标字段成功");

      console.log(colors.green("==========谱面信息=========="));
      console.log(colors.green("标题    : " + title));
      console.log(colors.green("谱师    : " + creator));
      console.log(colors.green("曲师    : " + artist));
      console.log(colors.green("物量    : " + resultNoteNumber));
      console.log(colors.green("BPM     : " + bpm));
      console.log(colors.green("轨道数量: " + column));
      console.log(colors.green("============================="));
      log.log("INFO", "showBeatmapInfo", "信息输出成功");
      log.log("INFO", "showBeatmapInfo", "退出showBeatMap函数");
      return { creator, title, artist };
    } catch (err) {
      console.error(colors.red("错误: " + err.message));
      log.log("ERROR", "showBeatmapInfo", "读取谱面文件失败： " + err);
      return null;
    }
  }
  // 获取BPM
  static getMusicBpm(data) {
    log.log("INFO", "CheackBeatmapInfo", "执行getMusicBpm函数");
    const bpms = data.time.map((t) => t.bpm);

    /*
    let bpmArray = new Array();

    for (let i = 0; i <= data.time?.length; i++) {
      let bpm = data.time[i].bpm;
      bpmArray.push(bpm);
      log.log(
        "INFO",
        "getMusicBpm",
        "第" + bpmArray.length + "次存储bpm到bpmArray数组：",
      );
      log.log("INFO", "getMusicBpm", bpmArray.slice(), true);
      log.log("INFO", "getMusicBpm", "BPM数据存储 完成 ", true);
    }

    let bpmNumber = bpmArray.length;
    log.lgo("INFO", "getMusicBpm", "bpmArray.length: " + bpmNumber, true);
    */

    log.log("INFO", "CheackBeatmapInfo", "退出getMusicBpm函数");
    return bpms;
  }
}
module.exports = CheckBeatmapInfo;
