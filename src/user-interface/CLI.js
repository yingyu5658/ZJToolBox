const fs = require('fs');
const colors = require('../utils/Color.js');
const log = require('../utils/GenerateLog.js');
const beatmapUserInterface = require('../malody/beatmap/UserInterface.js');
const BilibiliVideoDownload = require('../bilibili/UserInterface.js');
const { Command } = require('commander');
const root = new Command();
const ReplayUserInterface = require('../malody/replay/UserInterface.js');
const replayUserInterface = new ReplayUserInterface();

const INFO = 'INFO';
const WARN = 'WARN';
const ERROR = 'ERROR';

class CLI {
  constructor() {}

  init(VERSION, VERSION_INFO) {
    console.log(VERSION_INFO);

    root
      .version(VERSION)
      .description(
        '一个简单的命令行工具，有一些和引诱相关的实用功能\n输入"zjtb --help"来获取帮助信息',
      )
      .option('-a, --about', '关于')
      .option('-l, --log', '查看日志')
      .option('--noad', '禁用广告显示')

      .action((options) => {
        if (options.about) {
          console.log('ABOUT');
          console.log('├── Author  : yingyu5658 ');
          console.log(`├── version : ${VERSION_INFO} `);
          console.log('└── Language: Javascript ');
          console.log('作者博客：https://www.yingyu5658.me/');
        }

        if (options.noad) CLI.showAD(false);

        if (!options.noad) CLI.showAD(true);

        if (options.log) {
          let log = fs.readFileSync(
            './Log.log',
            { encoding: 'utf8' },
            (err) => {
              if (err) console.error(err);
            },
          );
          console.log(log);
        }
      });

    // mld子命令
    root
      .command('mld')
      .description('Malody功能')
      .option(
        '-b, --beatmap <filepath>',
        '查看Malody谱面信息。',
        (filePath) => {
          log.log('INFO', 'main', '执行查看谱面信息命令');
          beatmapUserInterface.main(filePath);
          return filePath;
        },
      )
      .option('-r, --replay <filePath>', '查看Malody回放信息。', (filePath) => {
        let info = replayUserInterface.getAllInfo(filePath);
        replayUserInterface.showAllInfo(info);
      });

    const lbl = require('../lu-bu-lu/Functions.js');
    const { time, timeStamp } = require('console');
    const Utils = require('../utils/Utils.js');
    // lbl子命令
    root
      .command('lbl')
      .description('卢布卢功能')
      .option('--coott', '自定义二选一', () => {
        lbl.chooseOneOfTheTwo();
      })
      .option(
        '--cofm <choiceNum>',
        '自定义多选一 <choiceNum> 为选项总数',
        (choiceNum) => {
          lbl.chooseOneFromMany(choiceNum);
        },
      )
      .option(
        '-m ,--randomMusicalAlphabet <count>',
        '生成随机顺序的音名',
        (count) => {
          let result = [];
          result = lbl.randomMusicalAlphabet(count);
          console.log(result.join(','));
        },
      );

    root
      .command('ts')
      .description('时间戳转换工具')

      .option(
        '--conversion, -c <timestamp>',
        '把时间戳转换为YYYY-MMMM-DD hh-mm的格式',
        (timestamp) => {
          let result = Utils.timeStampToTime(timestamp);
          if (result == 'ERROR') {
            return -1;
          } else {
            log.info('timeStampToTime', result, true);
          }
        },
      );

    root
      .command('bvd')
      .description('B站视频解析下载')
      .option(
        '-d, --download <bvid>',
        '视频BV号（保留前面大写的BV）',
        (bvid) => {
          let bvd = new BilibiliVideoDownload();
          bvd.start(bvid);
        },
      )
      .option(
        '-b, --batch <filePath>',
        '批量下载。filePath：存放BV号的文本文件',
        (filePath) => {
          let batch = new BilibiliVideoDownload(filePath);
          batch.startBatch(filePath);
        },
      );
    log.info('ZJTB', 'CLI初始化');
    root.parse(process.argv);
  }

  static showAD(isShow) {
    if (isShow === false) return;
    console.log(
      `
|============================|
|            广告            |
|----------------------------|
|    加入醉酒哈基米谢谢喵    |
|         591067249          |
|----------------------------|
|访问yingyu5658的万事屋谢谢喵|
| https://www.yingyu5658.me  |
|============================|
`,
    );
    log.info('AD', '广告投放完成', false);
  }
}

module.exports = CLI;
