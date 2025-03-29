const fs = require("fs");
const colors = require("colors");
const log = require("./GenerateLog");
const CheckBeatmapInfo = require("./CheckBeatmapInfo");
const { Command } = require("commander");
const root = new Command();

console.log("输入<软件名称> --help 来获取帮助信息。");

root
  .version("0.0.6")
  .description("一个简单的命令行工具，有一些和引诱相关的实用功能")
  .option(
    "-c, --check <filepath>",
    "查看Malody谱面信息。注意：filepath是.mcz",
    (filepath) => {
      log.log("INFO", "main", "执行查看谱面信息命令");
      CheckBeatmapInfo.parseZip(filepath);
      return filepath;
    },
  )
  .option("-a, --about", "关于", function () {
    console.log(colors.yellow("ABOUT"));
    console.log(colors.yellow("├── Author  : yingyu5658 "));
    console.log(colors.yellow("├── version : 0.0.6 "));
    console.log(colors.yellow("└── Language: Javascript "));
    console.log("作者博客：https://www.yingyu5658.cn/");
  });

log.log("INFO", "YMT", "初始化命令行工具");

root.parse(process.argv);
