const AD = `
加入醉酒哈基米591067249谢谢喵
关注www.yingyu5658.cn谢谢喵
`;

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
}

module.exports = Utils;
