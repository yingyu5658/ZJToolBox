const fs = require('fs');
const path = require('path');
const axios = require('axios');
const log = require('../utils/GenerateLog');
const { LOADIPHLPAPI } = require('dns');
const INFO = 'INFO';
const ERROR = 'ERROR';

// 配置默认请求头
axios.defaults.headers.common['Referer'] = 'https://www.bilibili.com';
axios.defaults.headers.common['User-Agent'] =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

class ParseVideo {
  static async getCid(bvid) {
    try {
      const response = await axios.get(
        `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
      );
      let cid = response.data.data.pages[0].cid;
      log.log(INFO, 'getCid', `[√] 获取到了${bvid}的cid：${cid}`, true);
      return cid;
    } catch (error) {
      log.log(ERROR, 'getCid', `[×] 在处理 ${bvid} 时发生错误：${error}`, true);
      throw error;
    }
  }

  static async getDownloadUrl(bvid, cid) {
    try {
      const response = await axios.get(`https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=80`);
      let url = response.data.data.durl[0].url;
      log.log(INFO, 'getDownloadUrl', `[√] 成功获取到Url：${url}`, true);
      log.info('getDownloadUrl', '下载任务已开始', true);
      return url;
    } catch (error) {
      log.log(ERROR,'getDownloadUrl',`[×] 在处理 ${cid}时 发生错误：${error}`,true);
      throw error;
    }
  }

  static async downloadVideo(bvid, url) {
    const referer = `https://www.bilibili.com/video/${bvid}`;
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          Referer: referer,
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
        },
        responseType: 'stream',
      });

      const filename = `${bvid}_${Date.now()}.mp4`;
      const dirPath = './BiliBiliDownloads';
      const filePath = path.join(dirPath, filename);

      // 确保下载目录存在
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // 创建写入流
      const writer = fs.createWriteStream(filePath);

      // 使用Promise包装写入过程
      await new Promise((resolve, reject) => {
        response.data.pipe(writer);

        writer.on('finish', () => {
          log.log(
            INFO,
            'downloadVideo',
            `[✓] 下载任务已完成，文件保存至：${filePath}`,
            true,
          );
          resolve();
        });

        writer.on('error', (error) => {
          log.log(ERROR, 'downloadVideo', `[×] 文件写入失败：${error}`, true);
          reject(error);
        });

        response.data.on('error', (error) => {
          log.log(ERROR, 'downloadVideo', `[×] 下载流错误：${error}`, true);
          reject(error);
        });
      });
    } catch (error) {
      log.log(ERROR, 'downloadVideo', `[×] 下载失败：${error}`, true);
      throw error;
    }
  }
}
module.exports = ParseVideo;