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

  // 输出日志到控制台和文件
  static outputLog(logLevel, log) {
    fs.appendFile("Log.log", log, "utf8", function (err) {
      if (err) throw err;
    });
  }

  /* 拼接日志并输出日志到控制台和文件
   * @param logLevel 日志级别 INFO WARN ERROR
   * @param data 日志内容
   * @param outputLogOnsole 是否输出到控制台
   */
  static log(logLevel, serve = "[YMT] ", data, outputLogOnsole = false) {
    if (!LogLevel[logLevel]) {
      console.error("日志级别错误", LogLevel[logLevel]);
      return -1;
    }

    const timestamp = this.getLogTime();
    const prefix = LogLevel[logLevel];
    const serveName = serve;
    const log = `${timestamp}${prefix}${serveName}${data}\n`;
    this.outputLog(logLevel, log);

    // 判断是否输出到控制台
    if (!outputLogOnsole) {
      return;
    } else {
      console.log(log);
    }

    return log;
  }
}

GenerateLog.log("INFO", "TEST: ", "这是一条INFO级别的日志", true);
module.exports = GenerateLog;
