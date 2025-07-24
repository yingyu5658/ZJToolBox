const { Command } = require('commander');
const Zjtb = require('./zjtb');
const zjtb = new Zjtb();

class Init {
  commandInit(command, VERSION, VERSION_INFO) {
    command
      .version(VERSION)
      .description(
        '有一些实用功能',
      )
      .option('-a, --about', '关于')
      .option('-l, --log', '查看日志')
      .action((options) => {
        if (options.about) zjtb.showAbout(VERSION);
        if (options.log) zjtb.showLog();

      });

    return command;
  }
}

module.exports = Init;
