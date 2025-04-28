const Mr = require('./ParseReplay.js');
const log = require('../../utils/GenerateLog.js');
const fs = require('fs');
const mr = new Mr();
const MrData = require('./MrData.js');
const mrData = new MrData();
const INT32_LENGTH = 4;
const colors = require('colors');

class UserInterface {
  constructor() {}
  getAllInfo(path) {
    try {
      const file = fs.readFileSync(path);
      log.info('getAllInfo', `回放文件路径：${path}`);
      const diffLength = mr.getStringLength(file, 58);
      log.info('getAllInfo', `diffLength: ${diffLength}`);
      const diff = mr.getDiff(file, diffLength);
      const beatmapNameLength = mr.getStringLength(file, diff.newOffset);
      log.info('getAllInfo', `diff.newOffset: ${diff.newOffset}`);
      const bn = mr.getBeatmapName(file, diff.newOffset, beatmapNameLength);
      const authorLength = mr.getStringLength(file, bn.newOffset);
      log.info('getAllInfo', `authorLength: ${authorLength}`);
      const finalScoreLength = INT32_LENGTH;
      const maxComboLength = INT32_LENGTH;
      const bestLength = INT32_LENGTH;
      const coolLength = INT32_LENGTH;
      const goodLength = INT32_LENGTH;
      const missLength = INT32_LENGTH;
      const judgeLength = INT32_LENGTH;

      const author = mr.getAuthor(file, bn.newOffset, authorLength);
      const finalScore = mr.getFinalScore(
        file,
        author.newOffset,
        finalScoreLength,
      );
      const maxCombo = mr.getMaxCombo(
        file,
        finalScore.newOffset,
        maxComboLength,
      );
      const best = mr.getBest(file, maxCombo.newOffset, bestLength);
      const cool = mr.getCool(file, best.newOffset, coolLength);
      const good = mr.getGood(file, cool.newOffset, goodLength);
      const miss = mr.getMiss(file, good.newOffset, missLength);
      const judge = mr.getJudge(file, miss.newOffset, judgeLength);
      mrData.diff = diff.diff;
      mrData.beatmapName = bn.beatmapName;
      mrData.author = author.author;
      mrData.finalScore = finalScore.finalScore;
      mrData.maxCombo = maxCombo.maxCombo;
      mrData.best = best.best;
      mrData.cool = cool.cool;
      mrData.good = good.good;
      mrData.miss = miss.miss;
      mrData.judge = judge.judge;
    } catch (error) {
      log.err('getAllInfo', `发生错误：${error}`, true);
    }
    return mrData;
  }

  showAllInfo(data) {
    let judgeColor = '';

    console.log(`===回放信息===
${colors.cyan('谱面名称')}: ${data.beatmapName}
${colors.cyan('谱面难度')}: ${data.diff}
${colors.cyan('谱面作者')}: ${data.author}
${colors.cyan('最终得分')}: ${data.finalScore}
${colors.cyan('最大连击')}: ${data.maxCombo}
${colors.red('B E S T ')}: ${data.best}
${colors.yellow('C O O L ')}: ${data.cool}
${colors.green('G O O D ')}: ${data.good}
${colors.gray('M I S S ')}: ${data.miss}`);
    switch (data.judge) {
      case 'A':
        console.log(
          `${colors.magenta('使用判定')}: ${colors.brightGreen(data.judge)}`,
        );
        break;
      case 'B':
        console.log(
          `${colors.magenta('使用判定')}: ${colors.green(data.judge)}`,
        );
        break;
      case 'C':
        console.log(
          `${colors.magenta('使用判定')}: ${colors.brightYellow(data.judge)}`,
        );
        break;
      case 'D':
        console.log(
          `${colors.magenta('使用判定')}: ${colors.yellow(data.judge)}`,
        );
        break;
      case 'E':
        console.log(`${colors.magenta('使用判定')}: ${colors.red(data.judge)}`);
        break;
    }
  }
}
module.exports = UserInterface;
