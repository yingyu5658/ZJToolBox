const ParseVideo = require("./ParseVideo");
const log = require("../utils/GenerateLog")
const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"
class UserInterface {
    constructor() { }

    async start(bvid) {
        try {
            const cid = await ParseVideo.getCid(bvid);
            const url = await ParseVideo.getDownloadUrl(bvid, cid);
            await ParseVideo.downloadVideo(bvid, url)
            return url
        } catch (error) {
            log.log("ERROR", "BilibiliVideoDownload", ` 发生错误：${error}`, true)
        }
    }


    async startBatch(filePath) {
        // let downloadList = []
        let n = 0
        try {
            const readline = require("readline")
            const fs = require("fs")
            const rl = readline.createInterface({
                input: fs.createReadStream(filePath),
                output: process.stdout,
                terminal: false
            })
            rl.on('line', (line) => {
                this.start(line)
                n++
                // downloadList.push(line)
                log.log(INFO, "startBatch", `读取到了 ${n} 个条目`, true)
            })
        }
        catch (error) {
            log.log("ERROR", "startBatch", `发生错误：${error}`, true)
            return -1
        }
    }
}
module.exports = UserInterface
