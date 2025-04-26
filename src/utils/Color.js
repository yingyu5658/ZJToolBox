// Colors.js
const Colors = {
  // 基础颜色
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // 背景颜色
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',

  // 样式
  bold: '\x1b[1m',
  underline: '\x1b[4m',
  reset: '\x1b[0m', // 重置所有样式
};

module.exports = Colors;
