// const { Client } = require('@hizollo/osu-api')

// // 初始化客户端
// const osu = new Client({ apiKey: '383e6125e9120c5b447c2896799c1dba13678b17' });

// // 获取玩家数据（通过用户名）
// const user = await osu.users.getUser({ user: 'yingyu5658' });
// console.log(`玩家 ${user.username} 等级：${user.level}`);

// // 获取玩家最佳成绩（前5名）
// const topPlays = await osu.users.getUserBest({
//   user: '33932276',          // 玩家ID
//   type: UserRequestType.Id,
//   mode: GameMode.Standard, // 游戏模式
//   limit: 5
// });
// console.log('最佳成绩：', topPlays[0].pp);

const log = require("../utils/GenerateLog.js")
const INFO = "INFO"
const WARN = "WARN"
const ERROR = "ERROR"










