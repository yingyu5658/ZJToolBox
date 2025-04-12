const tui = require("./UserInterface")
const fs = require("fs")
let temp = fs.readFileSync("./config/config.json")
let config = JSON.parse(temp)


t = new tui()

t.init(config)