const fs = require("fs");
const log = require("./GenerateLog");
const colors = require("colors");
const Utils = require("./Utils");
const path = require("path");
const compressing = require("compressing");
const { exit } = require("process");
const { equal } = require("assert");

const INFO = "INFO";
const WARN = "WARN";
const ERROR = "ERROR";

class CheckBeatmapInfo {
  static async parseZip(filePath) {
    try {
      await compressing.zip.uncompress(filePath, "./temp", {
        zipFileNameEncoding: "UTF-8",
      });
    } catch (e) {
      log.log(ERROR, "parseZip", "解压错误：" + e);
    }
    // 把.mc文件的路径遍历出来
    const beatmapList = CheckBeatmapInfo.traverseDirSync("./temp/");
    CheckBeatmapInfo.showChooseBeatmap(beatmapList);
    // 提示用户选择要查看的谱面
    return filePath;
  }

  // 遍历目录是否有.mc文件
  static traverseDirSync(dirPath) {
    var beatmapList = [];
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // 递归调用并合并子目录结果
        const subList = CheckBeatmapInfo.traverseDirSync(filePath);
        beatmapList = beatmapList.concat(subList);
      } else if (filePath.endsWith(".mc")) {
        beatmapList.push(filePath);
      }
    });
    return beatmapList;
  }

  // 让用户选择谱面查看信息
  static showChooseBeatmap(beatmapList) {
    if (beatmapList.length === 1) {
      CheckBeatmapInfo.showBeatmapInfo(beatmapList[0]);
    }

    if (beatmapList.length === 0) {
      log.log(ERROR, "showChooseBeatmap", "错误：这似乎不是.mcz文件哦", true);
      return -1;
    }

    console.log(
      "扫描出 " + beatmapList.length + " 张谱面, 输入序号来选择要查看的谱面：",
    );
    for (let i = 0; i < beatmapList.length; i++) {
      console.log(colors.yellow("[" + (i + 1) + "] ") + beatmapList[i]);
    }

    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "请输入要查看的谱面的序号序号（输入除数字外任意字符退出）：",
      (number) => {
        const num = parseFloat(number);
        if (isNaN(num) || num < 1 || num > beatmapList.length) {
          console.log(number);
          exit();
        }
        CheckBeatmapInfo.showBeatmapInfo(beatmapList[number - 1]);
        rl.close();
      },
    );

    return 0;
  }

  static deleteTempFile() {
    fs.rm(
      "./temp/",
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          log.log(
            ERROR,
            "deleteTempFile",
            "清理临时文件失败，请手动删除：" + err,
            true,
          );
        }

        Utils.showAD();
        log.log(INFO, "deleteTempFile", "清理临时文件成功", true);
      },
    );
  }

  static calcNoteNumber(data, filePath) {
    return data.note?.length || 0;
  }

  static showBeatmapInfo(filePath) {
    log.log(INFO, "showBeatmapInfo", "进入showBeatMap函数");
    try {
      // 同步读取文件内容
      const rawData = fs.readFileSync(filePath, "utf8");
      log.log(INFO, "showBeatmapInfo", "读取谱面文件成功");

      // 解析json字符串为对象
      const data = JSON.parse(rawData);
      log.log(INFO, "showBeatmapInfo", "解析谱面文件成功");

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

      log.log(INFO, "CheackBeatmapinfo", "提取目标字段成功");

      console.log(colors.blue("==========谱面信息=========="));
      console.log(colors.blue("标题    : " + title));
      console.log(colors.blue("谱师    : " + creator));
      console.log(colors.blue("曲师    : " + artist));
      console.log(colors.blue("物量    : " + resultNoteNumber));
      console.log(colors.blue("BPM     : " + bpm));
      console.log(colors.blue("轨道数量: " + column));
      console.log(colors.blue("============================="));
      log.log(INFO, "showBeatmapInfo", "信息输出成功");
      log.log(INFO, "showBeatmapInfo", "退出showBeatMap函数");
      CheckBeatmapInfo.deleteTempFile();
      return { creator, title, artist };
    } catch (err) {
      log.log(INFO, "showBeatmapInfo", "读取谱面文件失败： " + err, true);
      return null;
    }
  }
  // 获取BPM
  static getMusicBpm(data) {
    log.log(INFO, "CheackBeatmapInfo", "执行getMusicBpm函数");
    const bpms = data.time.map((t) => t.bpm);
    log.log(INFO, "CheackBeatmapInfo", "退出getMusicBpm函数");

    return bpms;
  }
}
module.exports = CheckBeatmapInfo;
