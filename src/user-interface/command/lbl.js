/**
 * 卢布卢命令相关
 * @author yingyu5658@outlook.com
 * @version 0.0.1
 */

const lbl = require('../../lu-bu-lu/Functions');

module.exports = (lblCommand) => {
    lblCommand
        .command('lbl')
        .description('卢布卢功能')
        .option('--coott', '自定义二选一', () => {
            lbl.chooseOneOfTheTwo();
        })
        .option(
            '--cofm <choiceNum>',
            '自定义多选一 <choiceNum> 为选项总数',
            (choiceNum) => {
                lbl.chooseOneFromMany(choiceNum);
            },
        )
        .option(
            '-m ,--randomMusicalAlphabet <count>',
            '生成随机顺序的音名',
            (count) => {
                let result = [];
                result = lbl.randomMusicalAlphabet(count);
                console.log(result.join(','));
            },
        );
}