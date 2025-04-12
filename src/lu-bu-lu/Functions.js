/**
 * @file 卢布卢函数
 * @module LuBuLu
 * @author yingyu5658
 * @version 1.0.0
 * @license MIT
 */

const fs = require("fs")
const { stdin, stdout } = require("process")

/**
 * 卢布卢的功能函数
 * @class
 */
class Functions {
    /**
     * 
     * 生成随机数决定是否炉管
     * 
     * @function
     * @returns true 卢
     * @returns false 布卢
     * @since 1.0.0
     */
    static luBuLu() {
        let result = Math.round(Math.random())
        if (result >= 0.5) {
            console.log("疯狂的鹿，不停的蛇！！！")
        } else {
            console.log("别让欲望击穿你的意志。")
        }
    }

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
        const readLine = require("readline")
        const rl = readLine.createInterface({
            input: stdin,
            output: stdout,
        })

        rl.question("请输入第一个选项：", (choice1) => {
            rl.question("请输入第二个选项：", (choice2) => {
                let result = Math.round(Math.random())
                if (result >= 0.5) {
                    console.log(`老天帮你选择了 ${choice1}`)
                } else {
                    console.log(`老天帮你选择了 ${choice2}`)
                }
                rl.close()
                return
            })
        })
    }

    /**
     * 自定义多选一，生成随机数作为选项数组索引
     * 
     * @function
     */
    static async chooseOneFromMany(choiceNum) {
    const readLine = require("readline");
    const { promisify } = require("util");
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = promisify(rl.question).bind(rl);

    const choiceList = [];
    
    for (let n = 0; n < choiceNum; n++) { 
        const choice = await question(`请输入第 ${n+1} 个选项：`);
        choiceList.push(choice); 
    }

    if (choiceList.length === 0) {
        console.log(colors.red("错误：未输入任何选项"));
        rl.close();
        return;
    }

    const resultIndex = Math.floor(Math.random() * choiceList.length); // 修复随机数范围
    console.log(`老天帮你选择了第 ${resultIndex + 1} 个选项：${choiceList[resultIndex]}`);
    rl.close();
}
}

module.exports = Functions