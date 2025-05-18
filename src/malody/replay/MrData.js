/**
 * 回放文件的数据结构
 * @author yingyu5658@outlook.com
 * @version 1.0.0
 */
class MrData {
  constructor() {
    this.diff = '未知';
    this.beatmapName = '未知';
    this.author = '未知';
    this.finalScore = 0;
    this.maxCombo = 0;
    this.best = 0;
    this.cool = 0;
    this.good = 0;
    this.miss = 0;
    this.judge = '未知';
    this.md5 = '未知';
  }
}

module.exports = MrData;
