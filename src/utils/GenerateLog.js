var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
const INFO = '[INFO] ';
const WARN = '[WARN] ';
const ERROR = '[ERROR] ';
const logTime = `[${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}] `;
const fs = require('fs');
const colors = require('colors');
const LogLevel = {
  INFO: '[INFO] ',
  WARN: '[WARN] ',
  ERROR: '[ERROR] ',
};

class GenerateLog {
  static writeLogToFile(logLevel, information) {
    fs.appendFile('Log.log', information, 'utf8', (err) => {
      if (err) throw err;
      return;
    });
  }

  static getLogTime() {
    return logTime;
  }

  static info(serve, information, outputLogOnsole) {
    const timestamp = this.getLogTime();
    const prefix = INFO;
    const serveName = serve;
    const fix = ': ';
    const outputLog = `${timestamp}${colors.green(prefix)}${serveName}${fix}${information}\n`;
    const writeLog = `${timestamp}${prefix}${serveName}${fix}${information}\n`;
    if (outputLogOnsole) console.log(outputLog);
    GenerateLog.writeLogToFile(INFO, writeLog);
  }

  static warn(serve, information, outputLogOnsole) {
    const timestamp = this.getLogTime();
    const prefix = WARN;
    const serveName = serve;
    const fix = ': ';
    const outputLog = `${timestamp}${colors.yellow(prefix)}${serveName}${fix}${information}\n`;
    const writeLog = `${timestamp}${prefix}${serveName}${fix}${information}\n`;

    if (outputLogOnsole) console.log(outputLog);
    GenerateLog.writeLogToFile(WARN, writeLog);
  }

  static err(serve, information, outputLogOnsole) {
    const timestamp = this.getLogTime();
    const prefix = ERROR;
    const serveName = serve;
    const fix = ': ';
    const outputLog = `${timestamp}${colors.red(prefix)}${serveName}${fix}${information}\n`;
    const writeLog = `${timestamp}${prefix}${serveName}${fix}${information}\n`;

    if (outputLogOnsole) console.log(outputLog);
    GenerateLog.writeLogToFile(WARN, writeLog);
  }

  /*
   * @param logLevel 日志级别
   * @param log 日志内容
   */
  static outputLogSync(logLevel, log) {
    fs.appendFileSync('Log.log', log, 'utf8', function (err) {
      console.error(err);
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
      console.error('日志级别错误', LogLevel[logLevel]);
      return -1;
    }
    const timestamp = this.getLogTime();
    const prefix = LogLevel[logLevel];
    const serveName = serve;
    const fix = ': ';
    let log = `${timestamp}${prefix}${serveName}${fix}${data}\n`;
    this.outputLogSync(logLevel, log);

    // 判断是否输出到控制台
    if (!outputLogOnsole) {
      return;
    } else {
      if (LogLevel[logLevel] === LogLevel.INFO) {
        console.log(
          `${timestamp}${colors.green(prefix)}${serve}${fix}${data}\n`,
        );
      }
      if (LogLevel[logLevel] === LogLevel.WARN) {
        console.log(
          `${timestamp}${colors.yellow(prefix)}${serve}${fix}${data}\n`,
        );
      }
      if (LogLevel[logLevel] === LogLevel.ERROR) {
        console.log(`${timestamp}${colors.red(prefix)}${serve}${fix}${data}\n`);
      }
    }
    return log;
  }
}

module.exports = GenerateLog;
