const ParseVideo = require("./ParseVideo");
const log = require("../utils/GenerateLog")
class UserInterface {
    constructor(){}

    async start(bvid) {
        try {
            const cid = await ParseVideo.getCid(bvid);
            const url = await ParseVideo.getDownloadUrl(bvid, cid);
            ParseVideo.downloadVideo(bvid, url)
            return url
        } catch (error) {
            log.log("ERROR", "BilibiliVideoDownload", ` 发生错误：${error}`, true)
        }
    }
}

module.exports = UserInterface
