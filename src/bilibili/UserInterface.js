/**
 * 用户接口
 * @author yingyu5658@outlook.com
 * @version 1.0.0
 */



const ParseVideo = require('./ParseVideo');
const log = require('../utils/GenerateLog');
const INFO = 'INFO';
const WARN = 'WARN';
const ERROR = 'ERROR';

/**
 * 命令行用户接口类，调用ParseVideo的方法，下载视频、输出日志
 */
class UserInterface {
  constructor() {}

  /**
   * 启动下载
   * @param bvid 视频BV号
   * @return {Promise<*>}
   * @author yingyu5658@outlook.com
   * @version 1.0.0
   */
  async start(bvid) {
    try {
      const cid = await ParseVideo.getCid(bvid);
      const url = await ParseVideo.getDownloadUrl(bvid, cid);
      await ParseVideo.downloadVideo(bvid, url);
      return url;
    } catch (error) {
      log.log('ERROR', 'BilibiliVideoDownload', ` 发生错误：${error}`, true);
    }
  }

  /**
   * 启动批量下载
   * @param filePath 存放BV列表的文本文件的路径
   * @return {Promise<number>}
   * @author yingyu5658@outlook.com
   * @version 1.0.0
   */
  async startBatch(filePath) {
    // let downloadList = []
    let n = 0;
    try {
      const readline = require('readline');
      const fs = require('fs');
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false,
      });
      rl.on('line', (line) => {
        this.start(line);
        n++;
        // downloadList.push(line)
        log.log(INFO, 'startBatch', `读取到了 ${n} 个条目`, true);
      });
    } catch (error) {
      log.log('ERROR', 'startBatch', `发生错误：${error}`, true);
      return -1;
    }
  }
}
module.exports = UserInterface;
