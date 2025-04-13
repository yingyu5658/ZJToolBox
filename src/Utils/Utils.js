const AD = `
加入醉酒哈基米591067249谢谢喵
关注www.yingyu5658.cn谢谢喵
`;


const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

const log = require("./GenerateLog")


class Utils {
  static clearScreen() {
    // ANSI 转义序列：
    // - \x1b[H: 移动光标到屏幕左上角
    // - \x1b[0J: 清除从光标位置到屏幕末尾的内容（不清除历史缓冲区）
    process.stdout.write("\x1b[H");
  }

  static showAD() {
    console.log(AD);
  }

  /**
 * 
 * 时间戳转换到正常格式时间
 * 
 * @param {number} timestamp 时间戳
 * @returns {stirng} result YYYY-MM-DD hh:mm格式的时间
 */


  static timeStampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const Y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, '0');
    const D = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    let result = `${Y}-${M}-${D} ${h}:${m}`;
    if (result.includes("NaN")) {
      log.log(ERROR, "timeStampToTime", "错误：时间戳有误：" + timestamp, true)

      return ERROR
    } else {
      return result
    }
  }
}

module.exports = Utils;
