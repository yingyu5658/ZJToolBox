const CLI = require("./user-interface/CLI.js")
const VERSION = "1.1.0"
const VERSION_INFO = `ZJTB @${VERSION}`

let cli = new CLI()
cli.init(VERSION, VERSION_INFO)

