const fs = require("fs");
const colors = require("../Utils/Color.js");
const log = require("../Utils/GenerateLog.js")
const beatmapUserInterface = require("../Malody/Beatmap/UserInterface.js");
const { Command } = require("commander");
const root = new Command();

const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

const VERSION = "1.0.2"
const VERSION_INFO = `ZJTB @${VERSION}`

console.log(VERSION_INFO)

root
  .version(VERSION)
  .description("一个简单的命令行工具，有一些和引诱相关的实用功能\n输入\"zjtb --help\"来获取帮助信息")
  .option("-a, --about", "关于", function () {
    console.log(colors.yellow("ABOUT"));
    console.log(colors.yellow("├── Author  : yingyu5658 "));
    console.log(colors.yellow(`├── version : ${VERSION_INFO} `));
    console.log(colors.yellow("└── Language: Javascript "));
    console.log("作者博客：https://www.yingyu5658.cn/");
  });

// mld子命令
root.command("mld")
  .option(
    "-c, --check <filepath>",
    "查看Malody谱面信息。注意：filepath是.mcz",
    (filePath) => {
      log.log("INFO", "main", "执行查看谱面信息命令");
      beatmapUserInterface.main(filePath);
      return filePath;
    },
  )

const lbl = require("../LuBuLu/Functions.js")
// lbl子命令
root.command("lbl")
  .option(
    "--lbl",
    "决定是否炉管",
    () => {
      lbl.luBuLu()
    }
  )

  .option(
    "--coott",
    "自定义二选一",
    () => {
      lbl.chooseOneOfTheTwo();
    }
  )

  .option(
    "--cofm <choiceNum>",
    "自定义多选一 <choiceNum> 为选项总数",
    (choiceNum) => {
      lbl.chooseOneFromMany(choiceNum)
    }
  )

log.log("INFO", "ZJTB", "初始化");

root.parse(process.argv)
