const fs = require("fs");
const colors = require("colors");
class CheackBeatmapInfo {
  constructor() {
    this.filePath = "./beatmaps/beatmap.json";
    this.data = this.constructor.CheackBeatmapFile(this.filePath);
  }

  static showBeatmapInfo(filePath) {
    try {
      // 同步读取文件内容
      const rawData = fs.readFileSync(filePath, "utf8");

      // 解析json字符串为对象
      const data = JSON.parse(rawData);

      // 提取目标字段
      const creator = data.meta?.creator;
      const title = data.meta?.song?.title;
      const artist = data.meta?.song?.artist;

      return { creator, title, artist };
    } catch (err) {
      console.error(colors.red("错误: " + err.message));
      return null;
    }
  }
}
module.exports = CheackBeatmapInfo;
