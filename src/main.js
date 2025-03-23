const fs = require("fs");
const colors = require("colors");
const log = require("./GenerateLog");
const CheckBeatmapInfo = require("./CheckBeatmapInfo");
const { Command } = require("commander");
const root = new Command();

root
  .version("0.0.1")
  .description("一个简单的命令行工具，有一些和引诱相关的实用功能")
  .option("-c, --check <filepath>", "查看Malody谱面信息", (filepath) => {
    log.log("INFO", "CheackBeatmapInfo", "触发check选项");
    CheckBeatmapInfo.showBeatmapInfo(filepath);
    return filepath;
  });

log.log("INFO", "YMT", "初始化命令行工具");

root.parse(process.argv);
