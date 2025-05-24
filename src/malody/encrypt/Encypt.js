const log = require('../../utils/GenerateLog.js');

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

class Encrypt {
  generateASCIIArray(string) {
    if (string === '' || string === null) {
      log.err('generateASCIIArray', `无效的输入：${string}`, true);
      return -1;
    }

    const stringArray = string.split('');
    for (let i = 0; i < stringArray.length; i++) {
      stringArray[i] = stringArray[i].charCodeAt(0);
    }

    return stringArray;
  }

  encrypt(stringArray, key) {
    if (stringArray.length <= 0) {
      log.err('encrypt', `无效的输入：${stringArray}`, true);
      return -1;
    }

    if (!key || typeof key !== 'string') {
      log.err('encrypt', `无效的秘钥：${key}`, true);
      return -1;
    }

    // 处理秘钥：所有字符转ASCII码
    const keyArray = key.split('').map((char) => {
      if (letters.includes(char)) {
        return char.charCodeAt(0);
      }
      return parseInt(char) || 0; // 处理数字字符
    });

    // 加密处理
    const result = [];
    for (let i = 0; i < stringArray.length; i++) {
      const keyIndex = i % keyArray.length;
      const encryptedValue = stringArray[i] * keyArray[keyIndex];
      result.push(encryptedValue);
    }

    return result;
  }
}

module.exports = Encrypt;
