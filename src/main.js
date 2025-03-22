const fs = require("fs");
const colors = require("colors");
const CheackBeatmapInfo = require("./CheackBeatmapInfo");
const { Command } = require("commander");
const root = new Command();

root
  .version("0.0.1")
  .description("一个简单的命令行工具，有一些和引诱相关的实用功能")
  .option("-c, --cheack <filepath>", "检查Malody谱面信息");

const options = root.opts();
if (options.cheack) {
  CheackBeatmapInfo.showBeatmapInfo(filepath);
}

root.parse();
