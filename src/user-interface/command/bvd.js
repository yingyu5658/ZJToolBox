/**
 * B站视频下载相关
 * @author yingyu5658@outlook.com
 * @version 0.0.1
 */

const BilibiliVideoDownload = require("../../bilibili/UserInterface")

module.exports = (bvd) => {
    bvd
        .command('bvd')
        .description('B站视频解析下载')
        .option(
            '-d, --download <bvid>',
            '视频BV号（保留前面大写的BV）',
            (bvid) => {
                let bvd = new BilibiliVideoDownload();
                bvd.start(bvid);
            },
        )
        .option(
            '-b, --batch <filePath>',
            '批量下载。filePath：存放BV号的文本文件',
            (filePath) => {
                let batch = new BilibiliVideoDownload(filePath);
                batch.startBatch(filePath);
            },
        );
}