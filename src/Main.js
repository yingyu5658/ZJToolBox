const log = require("./utils/GenerateLog.js")
console.log(
`
|============================|
|            广告            |
|----------------------------|
|    加入醉酒哈基米谢谢喵    |
|         591067249          |
|----------------------------|
|访问yingyu5658的万事屋谢谢喵|
| https://www.yingyu5658.me  |
|============================|
`
)
log.info("AD", "广告投放完成", false)


const CLI = require("./user-interface/CLI.js")
const VERSION = "1.4.0"
const VERSION_INFO = `ZJTB @${VERSION}`

let cli = new CLI()
cli.init(VERSION, VERSION_INFO)
log.log("INFO", "Main", "程序执行完毕")
