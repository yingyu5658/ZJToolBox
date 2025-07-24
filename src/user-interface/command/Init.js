const { Command } = require('commander');
const Zjtb = require('./zjtb');
const zjtb = new Zjtb();

class Init {
    commandInit(command, VERSION, VERSION_INFO) {
        command
            .version(VERSION)
            .description(
                '有一些实用功能',
            )
        return command;
    }
}

module.exports = Init;
