const log = require("../utils/GenerateLog")
const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"

const fs = require("fs")
const { user } = require("osu-api-extended/dist/routes/v1")
const readline = require("readline")

class UserInterface {
    constructor() { }

    init(config) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        if (config[0].apiKey === null) {

            rl.question("请输入API Key：", (apiKey) => {
                if (apiKey === null || apiKey === "") {
                    log.log(WARN, "init", `输入信息无效：${apiKey}`, true)
                    rl.close()
                    this.init(config)
                } else {
                    config[0].apiKey = apiKey
                    fs.writeFile("./config/config.json", JSON.stringify(config, null, 4), (err) => {
                        if (err) throw err
                        log.log(INFO, "init", `config.json变更：${apiKey}`)
                    })
                    return 0
                }
            })
        }
        

        if (config[0].username === 0) {
            rl.question("请输入osu!的用户名",(username) => {
                if(username === null || username === "") {
                    log.log(WARN, "init", `输入信息无效：${username}`, true)
                    rl.close()
                    this.init(config)
                } else {
                    config[0].username = username
                    fs.watchFile("./config/config.json", JSON.stringify(config, null,4), (err) => {
                        if(err) throw err
                        log.log(INFO, "init", `config.json变更：${username}`)
                    })
                    log.log(INFO, "init", "初始化配置成功", true)
                    return 0;
                }
            })
        }

        rl.close()
    }
}

module.exports = UserInterface