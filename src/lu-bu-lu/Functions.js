/**
 * @file 卢布卢函数
 * @module LuBuLu
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

const fs = require('fs');
const { stdin, stdout } = require('process');
const log = require('../utils/GenerateLog.js');

/**
 * 卢布卢的功能函数
 * @class
 */
class Functions {
  /**
   * 自定义二选一
   *
   * @param {string} choice1 第一个选项
   * @param {string} choice2 第二个选项
   * @returns true
   * @returns false
   * @function
   */
  static chooseOneOfTheTwo() {
    const readLine = require('readline');
    const rl = readLine.createInterface({
      input: stdin,
      output: stdout,
    });

    rl.question('请输入第一个选项：', (choice1) => {
      rl.question('请输入第二个选项：', (choice2) => {
        let result = Math.round(Math.random());
        if (result >= 0.5) {
          console.log(`老天帮你选择了 ${choice1}`);
        } else {
          console.log(`老天帮你选择了 ${choice2}`);
        }
        rl.close();
        return;
      });
    });
  }

  /**
   * 自定义多选一，生成随机数作为选项数组索引
   *
   * @function
   */
  static async chooseOneFromMany(choiceNum) {
    const readLine = require('readline');
    const { promisify } = require('util');
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = promisify(rl.question).bind(rl);

    const choiceList = [];

    for (let n = 0; n < choiceNum; n++) {
      const choice = await question(`请输入第 ${n + 1} 个选项：`);
      choiceList.push(choice);
    }

    if (choiceList.length === 0) {
      console.log(colors.red('错误：未输入任何选项'));
      rl.close();
      return;
    }

    const resultIndex = Math.floor(Math.random() * choiceList.length); // 修复随机数范围
    console.log(
      `老天帮你选择了第 ${resultIndex + 1} 个选项：${choiceList[resultIndex]}`,
    );
    rl.close();
  }

  static randomMusicalAlphabet(count) {
    let resultList = [];
    for (let i = 0; i < count; i++) {
      let result = Math.floor(Math.random() * 7);
      switch (result) {
        case 0:
          result = 'C';
          break;
        case 1:
          result = 'D';
          break;
        case 2:
          result = 'E';
          break;
        case 3:
          result = 'F';
          break;
        case 4:
          result = 'G';
          break;
        case 5:
          result = 'A';
          break;
        case 6:
          result = 'B';
          break;
      }
      resultList.push(result);
    }
    return resultList;
  }
}

module.exports = Functions;
