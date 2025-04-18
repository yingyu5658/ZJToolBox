const fs = require('fs')
const path = require('path')
const axios = require("axios")
const log = require("../utils/GenerateLog")
const INFO = "INFO"
const ERROR = "ERROR"


// 配置默认请求头
axios.defaults.headers.common["Referer"] = "https://www.bilibili.com";
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";


/**
 *
 */
class ParseVideo {
    static async getCid(bvid) {
        try {

            const response = await axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
            let cid = response.data.data.pages[0].cid
            log.log(INFO, "getCid", `获取到了${bvid}的cid：${cid}`, true)
            return cid
        } catch (error) {
            log.log(ERROR, "getCid", `发生错误：${error}`, true)
            throw error
        }
    }

    static async getDownloadUrl(bvid, cid) {
        try {

            const response = await axios.get(`https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=80`)
            let url = response.data.data.durl[0].url
            log.log(INFO, "getDownloadUrl", `成功获取到Url：${url}`, true)
            return url
        } catch (error) {
            log.log(ERROR, "getDownloadUrl", `发生错误：${error}`, true)
            throw error
        }
    }

    static downloadVideo(bvid, url) {
        const referer = `https://www.bilibili.com/video/${bvid}`
        axios.get(url, {
            headers: {
                'Referer': referer,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
            },
            responseType: 'stream'
        }
        )
        .then(response => {
            const filename = `${bvid}_${Date.now()}.mp4`
            fs.mkdirSync(`./BilibiliDownload/${filename}/`)
            response.data.pipe(fs.createWriteStream(`./BilibiliDownload/${filename}/${filename}.mp4`))
            log.log(INFO, "downloadVideo", "下载成功！文件已保存到./BiliBiliDownload/", true)
        })
        .catch (error => log.log(ERROR, "downloadVideo", `下载失败：${error}`, true))
      return -1
    }
}
module.exports = ParseVideo
