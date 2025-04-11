const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const INFO = "[INFO] ";
const WARN = "[WARN] ";
const ERROR = "[ERROR] ";
const logTime = `[${year}-${month}-${day} ${hour}:${minute}:${second}] `;
const { colors } = require("blessed");
const fs = require("fs");

const LogLevel = {
  INFO: "[INFO] ",
  WARN: "[WARN] ",
  ERROR: "[ERROR] ",
};

class GenerateLog {
  /*
   * @param logTime 日志前缀时间戳
   * */
  static getLogTime() {
    return logTime;
  }

  /*
   * @param logLevel 日志级别
   * @param log 日志内容
   */
  static outputLog(logLevel, log) {
    fs.appendFileSync("Log.log", log, "utf8", function (err) {
      console.error(err)
    });
  }

  /* 拼接日志并输出日志到控制台和文件
   * @param logLevel 日志级别 INFO WARN ERROR
   * @param data 日志内容
   * @param outputLogOnsole 是否输出到控制台
   * @param serve 日志服务名称
   */
  static log(logLevel, serve, data, outputLogOnsole = false) {
    if (!LogLevel[logLevel]) {
      console.error("日志级别错误", LogLevel[logLevel]);
      return -1;
    }

    const timestamp = this.getLogTime();
    const prefix = LogLevel[logLevel];
    const serveName = serve;
    const fix = ": ";
    const log = `${timestamp}${prefix}${serveName}${fix}${data}\n`;
    this.outputLog(logLevel, log);

    const colors = require("colors");
    // 判断是否输出到控制台
    if (!outputLogOnsole) {
      return;
    } else {
      if (LogLevel[logLevel] === LogLevel.INFO) console.log(colors.green(log));
      if (LogLevel[logLevel] === LogLevel.WARN) console.log(colors.yellow(log));
      if (LogLevel[logLevel] === LogLevel.ERROR) console.log(colors.red(log));
    }

    return log;
  }
}
module.exports = GenerateLog;