const readline = require("readline");
const GenerateLog = require("./GenerateLog");
const { promisify } = require("util");
const colors = require("colors");
const { log } = require("console");

class DanCalculator {
  constructor() {
    // 定义段位基类

    this.LnDan = class LnDan extends this.Dan4k {
      constructor(...args) {
        super(args[0], args[2], args[4], args[6], args[8]);
        this.m_lnKey1 = args[1];
        this.m_lnKey2 = args[3];
        this.m_lnKey3 = args[5];
        this.m_lnKey4 = args[7];
      }
    };

    this.Dan4k = class {
      constructor(key1, key2, key3, key4, danName) {
        this.m_key1 = key1;
        this.m_key2 = key2;
        this.m_key3 = key3;
        this.m_key4 = key4;
        this.m_danName = danName;
      }
    };

    // 定义各类型段位
    this.MaDan = class MaDan extends this.Dan4k {
      constructor(key1, key2, key3, key4, ...names) {
        super(key1, key2, key3, key4, names.pop());
        [this.m_name1, this.m_name2, this.m_name3, this.m_name4] = names;
      }
    };

    this.ReformDan = class extends this.Dan4k {
      constructor(key1, key2, key3, key4, ...names) {
        super(key1, key2, key3, key4, names.pop());
        [this.m_name1, this.m_name2, this.m_name3, this.m_name4] = names;
      }
    };

    this.OmDan = class extends this.Dan4k {}; // 初始化数据
    this.initializeData();
  }

  initializeData() {
    log.log("INFO", "DanCalculator", "初始化数据");
    // LnDan数据
    this.lnArr = [
      new LnDan(717, 176, 336, 191, 176, 106, 613, 401, "ln1"),
      new LnDan(805, 379, 805, 609, 377, 328, 805, 805, "ln2"),
      new LnDan(836, 469, 921, 421, 612, 268, 1157, 538, "ln3"),
      new LnDan(907, 562, 1053, 552, 413, 368, 1067, 1066, "ln4"),
      new LnDan(1904, 1052, 887, 726, 1380, 533, 1220, 661, "ln5"),
      new LnDan(1365, 959, 745, 667, 1219, 672, 1534, 887, "ln6"),
      new LnDan(1394, 682, 1119, 852, 832, 832, 1666, 720, "ln7"),
      new LnDan(1445, 1249, 1318, 1106, 1258, 1228, 1694, 866, "ln8"),
      new LnDan(2500, 1569, 1461, 1132, 1321, 1104, 2307, 1392, "ln9"),
      new LnDan(2377, 1548, 1656, 1464, 1689, 1677, 2185, 1470, "ln10"),
      new LnDan(1864, 1643, 1493, 1019, 2338, 2092, 2529, 1996, "ln11"),
      new LnDan(1798, 1188, 2633, 2178, 1822, 1730, 2449, 1941, "ln12"),
      new LnDan(2570, 2155, 2452, 1751, 2123, 1528, 2818, 2243, "ln13"),
      new LnDan(2319, 2096, 2408, 1912, 2483, 1835, 2158, 1789, "ln14"),
      new LnDan(3216, 2937, 3209, 2452, 3278, 2626, 3149, 2814, "ln15"),
    ];
    log.log("INFO", "DanCalculator", "初始化Ln段数据");

    // MaDan数据
    this.MaArr = [
      new MaDan(
        813,
        955,
        907,
        654,
        "Glitch Nerds",
        "Borealis",
        "Niflheim",
        "Moon",
        "1dan",
      ),
      new MaDan(
        1152,
        850,
        950,
        969,
        "Follow Tomorrow",
        "Bronze Coffin",
        "Keigan no Zettaireido",
        "SakuraMirage",
        "2dan",
      ),
      new MaDan(
        1169,
        1143,
        974,
        1347,
        "Quon",
        "Genkyoku o Kirikizamu",
        "Gin no Kaze",
        "Adjudicatorz-Danzai-",
        "3dan",
      ),
      new MaDan(
        1400,
        1402,
        1685,
        1599,
        "Tenkuu no Yoake",
        "VALLISTA",
        "Crystal World ~Fracture~",
        "Zenithalize",
        "4dan",
      ),
      new MaDan(
        1953,
        2250,
        2166,
        1667,
        "Ten Thousand Tons of Anonymous Letters",
        "Chips of Notes",
        "Despair of Elferia",
        "Kamigami no Asobi",
        "5dan",
      ),
      new MaDan(
        1487,
        1424,
        1381,
        1587,
        "Sweet Cherry X",
        "Akasagarbha",
        "HELLO EveryOne",
        "DataErr0r",
        "6dan",
      ),
      new MaDan(
        1909,
        1814,
        1777,
        2681,
        "Fairy Stage",
        "Xross Infection",
        "Wave",
        "Blue Zenith",
        "7dan",
      ),
      new MaDan(
        1962,
        1067,
        2388,
        1772,
        "The Lost Dedicated",
        "The Party We Have Never Seen",
        "Finixe",
        "Ultimate Dream",
        "8dan",
      ),
      new MaDan(
        1799,
        2023,
        2283,
        1787,
        "Dusk",
        "Panic Popn Picnic",
        "Kick-ass Kung-Fu Carnival",
        "Yakusoku no kimi",
        "9dan",
      ),
      new MaDan(
        2606,
        2188,
        2194,
        2187,
        "Chaser",
        "Loli Fantasy",
        "Daydream",
        "Moon Gate",
        "10dan",
      ),
      new MaDan(
        2160,
        1952,
        1821,
        3249,
        "Border of Life",
        "Scorpion Dance",
        "The Island of Albatross",
        "beautiful loli thing",
        "ex1",
      ),
      new MaDan(
        2871,
        2024,
        1871,
        2452,
        "Hitsune no youmeiri",
        "紫阳花-AZISAI-",
        "love&justice",
        "message",
        "ex2",
      ),
      new MaDan(
        2327,
        1593,
        2166,
        2200,
        "Jumble Rumble",
        "End Time",
        "++",
        "Crow Solace",
        "ex3",
      ),
      new MaDan(
        2731,
        2653,
        2033,
        2761,
        "EDM Jumpers",
        "line-epsilon",
        "Contrapasso -paradiso-",
        "YELL!",
        "ex4",
      ),
      new MaDan(
        3229,
        2731,
        2561,
        2109,
        "Satori de Pon!",
        "Legend of Seeker",
        "Crystal World -Fracture-",
        "Wizdomiot",
        "ex5",
      ),
      new MaDan(
        1766,
        1861,
        3171,
        1680,
        "Sepia",
        "Nopea",
        "Satori Trisis",
        "Death",
        "ex6",
      ),
      new MaDan(
        2339,
        2461,
        2511,
        2177,
        "Paranoia",
        "Boulafacet",
        "Paraclete -Miracle-",
        "Yumemi no Shonen",
        "ex7",
      ),
      new MaDan(
        1929,
        2380,
        2710,
        4675,
        "Martail Arts",
        "Gene Disruption",
        "Paradigm Shift",
        "Death Melody",
        "ex8",
      ),
      new MaDan(
        3468,
        3335,
        3698,
        5061,
        "Only my railgun",
        "-Purgatorium-",
        "Blue Zenith",
        "Inner Universe",
        "exfin",
      ),

      new MaDan(
        492,
        529,
        595,
        681,
        "Ikitoshi Ikerumono",
        "Rambling Pleat",
        "Yi Meng Qian Xiao",
        "White Eternity",
        "0danv3",
      ),
      new MaDan(
        695,
        621,
        718,
        1279,
        "Rex Incoqnito",
        "Koiseyo Otome!",
        "Break",
        "KING",
        "1danv3",
      ),
      new MaDan(
        1397,
        1090,
        805,
        1212,
        "Stargazer",
        "Seyana",
        "Love Emotion",
        "Mermaid Girl",
        "2danv3",
      ),
      new MaDan(
        1055,
        1489,
        1288,
        1789,
        "Koi Kou Enishi",
        "Onegai!Kon Kon Oinari-sama",
        "The Last page",
        "Hoshi ga Furanai Machi",
        "3danv3",
      ),
      new MaDan(
        1865,
        1434,
        1284,
        1839,
        "Umiyuri Kaiteitan",
        "Fire in the sky",
        "Icyxis",
        "The Crimson Empire",
        "4danv3",
      ),
      new MaDan(
        1282,
        1706,
        1473,
        1939,
        "Platinum Disco",
        "Cute na Kanojo",
        "Reimei Sketchbook",
        "Joker",
        "5danv3",
      ),
      new MaDan(
        1694,
        1636,
        1803,
        2115,
        "Chocolate Disco",
        "Call Me, Beep Me (If You Wanna Reap Me)",
        "DIE IN THE SEA",
        "unhappy century",
        "6danv3",
      ),
      new MaDan(
        1701,
        1799,
        2132,
        1899,
        "Don't Stop The Music",
        "Six Acid Strings",
        "Arkadia [Illusion]",
        "Valkyrie Revolutia",
        "7danv3",
      ),
      new MaDan(
        2237,
        2081,
        2280,
        2000,
        "Don't let you down",
        "Yoru ni Kakeru",
        "Snow Veil -Shoujo to Kemono no Mori-",
        "Positive Dance Time",
        "8danv3",
      ),
      new MaDan(
        2374,
        1899,
        2142,
        1810,
        "Kikai Shoujo Gensou",
        "Cold Planet",
        "Stray Star",
        "Unleashed World",
        "9danv3",
      ),
      new MaDan(
        2034,
        1740,
        2270,
        2166,
        "Hiensou",
        "Rocky Buinne",
        "Yue Ai Yue Ye",
        "Spin Eternally",
        "10danv3",
      ),
      new MaDan(
        1952,
        2013,
        1953,
        2111,
        "Scorpion Dance",
        "Tailin no Soul",
        "Eiya no Parade",
        "Onsoku Uchuu Ryokou",
        "ex1v3",
      ),
      new MaDan(
        2107,
        1953,
        2386,
        2674,
        "Moments",
        "Towards the Horizon",
        "Torikago",
        "Frontier Explorer",
        "ex2v3",
      ),
      new MaDan(
        2518,
        2636,
        2326,
        2511,
        "Edison",
        "INTERNET OVERDOSE",
        "Euthanasia",
        "Fin.ArcDeaR",
        "ex3v3",
      ),
      new MaDan(
        2634,
        2212,
        2336,
        2602,
        "ZENITHALIZE",
        "Asymmetrical Grooves",
        "Pure Ruby",
        "EVERLASTING HAPPiNESS",
        "ex4v3",
      ),
      new MaDan(
        2734,
        2417,
        3089,
        2974,
        "Bring Our Ignition Back",
        "Unsan-musho",
        "Electric Angel",
        "Kegare Naki Bara Juuji",
        "ex5v3",
      ),
      new MaDan(
        2483,
        2276,
        2921,
        3194,
        "Defeat awaken battle ship",
        "Extraction",
        "Pastel Subliminal",
        "Synthesized Fortress",
        "ex6v3",
      ),
      new MaDan(
        2846,
        2260,
        2333,
        3347,
        "LiFE Garden",
        "Alpha",
        "Stay Alive",
        "Heaven's Fall",
        "ex7v3",
      ),
      new MaDan(
        3789,
        3663,
        2424,
        3255,
        "Hayabusa",
        "Shuu no hazama",
        "Amatsukami",
        "CRIMSON FIGHTER",
        "ex8v3",
      ),
      new MaDan(
        3888,
        3030,
        3581,
        3700,
        "crazy_tek (DJ Noriken Remix)",
        "Nhelv",
        "Shuuten",
        "Deadly force - Put an end",
        "ex9v3",
      ),
      new MaDan(
        2828,
        3362,
        3393,
        5100,
        "Infinity Heaven",
        "NEURO-CLOUD-9",
        "Kizuato",
        "Runengon",
        "exfinv3",
      ),
    ];
    log.log("INFO", "DanCalculator", "初始化Ma段数据");

    // ReformDan数据
    let ReformArr = [
      new ReformDan(
        878,
        696,
        954,
        1167,
        "Miracle Chance",
        "Want U 2",
        "Shelter ",
        "Tommorow Perfume",
        "1dan",
      ),
      new ReformDan(
        1107,
        905,
        955,
        1487,
        "Flashes",
        "Vermillion",
        "Snow Storm",
        "Eternal Drain",
        "2dan",
      ),
      new ReformDan(
        1008,
        797,
        1047,
        1259,
        "Dimension Tripper!!!!",
        "Kirlian Shores",
        "Entelecheia",
        "True Blue",
        "3dan",
      ),
      new ReformDan(
        905,
        1499,
        1283,
        2071,
        "CrossOver",
        "Ephemera",
        "Shannon's Theorem",
        "Angel Of Darkness",
        "4dan",
      ),
      new ReformDan(
        1293,
        1722,
        1126,
        1903,
        "Energy Flower 3007",
        "Brainfog",
        "Palette GAMMA",
        "Elektric U-Phoria",
        "5dan",
      ),
      new ReformDan(
        1487,
        1266,
        1749,
        2186,
        "Sweet Cherry X",
        "The Bird's Midair Heatstroke",
        "SOS",
        "M-A",
        "6dan",
      ),
      new ReformDan(
        2114,
        1777,
        1937,
        2734,
        "Last Chance",
        "WAVE",
        "Hospital",
        "Hymn",
        "7dan",
      ),
      new ReformDan(
        2177,
        1309,
        1507,
        1589,
        "To The Limit",
        "RATO",
        "Omen",
        "Anguish",
        "8dan",
      ),
      new ReformDan(
        2114,
        2070,
        2610,
        2272,
        "Can't Take my Eyes",
        "Cicadidae",
        "Punishment",
        "Firmament Castle Velier",
        "9dan",
      ),
      new ReformDan(
        1906,
        1460,
        1723,
        2392,
        "The Lost Dedicated",
        "Rave 7.7",
        "Oh Curry!",
        "Chandelier",
        "10dan",
      ),
      new ReformDan(
        2265,
        1528,
        2300,
        3334,
        "Dark Sambaland",
        "Odoru Mizushibuki",
        "Makiba",
        "LazorBeamz",
        "alpha",
      ),
      new ReformDan(
        2274,
        2308,
        2395,
        2301,
        "Paradigm Shift",
        "Blue Planet",
        "Edison",
        "Time to Say Goodbye",
        "beta",
      ),
      new ReformDan(
        1973,
        1980,
        1429,
        3979,
        "Break",
        "Fastest Crash",
        "Reflec Streamz",
        "We Luv Lama",
        "gamma",
      ),
      new ReformDan(
        2018,
        2711,
        3268,
        2629,
        "Aquaris",
        "Crescent Moon Boss Battle",
        "Volcanic",
        "Future Dominators",
        "delta",
      ),
      new ReformDan(
        2128,
        2552,
        2194,
        2829,
        "Rose Quartz",
        "Forgotten",
        "Mario Paint",
        "Hitsugi to Futago",
        "epsilon",
      ),
    ];
    log.log("INFO", "DanCalculator", "初始化Reform段数据");

    // OmDan数据
    let OmArr = [
      new OmDan(751, 1073, 926, 1216, "1dan"),
      new OmDan(821, 889, 778, 1403, "1danv2"),
      new OmDan(858, 1029, 1049, 871, "2dan"),
      new OmDan(916, 806, 1127, 1487, "2danv2"),
      new OmDan(1445, 1150, 1300, 1250, "3dan"),
      new OmDan(1047, 1066, 1259, 1344, "3danv2"),
      new OmDan(1227, 1441, 2164, 2072, "4dan"),
      new OmDan(1671, 1892, 2198, 3254, "5dan"),
      new OmDan(1875, 1494, 1670, 2186, "6dan"),
      new OmDan(2110, 1309, 1779, 1813, "7dan"),
      new OmDan(2110, 1779, 2024, 1777, "7danv2"),
      new OmDan(2287, 2040, 1530, 2262, "8dan"),
      new OmDan(2288, 1309, 1885, 2213, "8danv2"),
      new OmDan(3779, 1460, 2658, 3648, "9dan"),
      new OmDan(2114, 2026, 2367, 2987, "9danv2"),
      new OmDan(2128, 1887, 1775, 2443, "10dan"),
      new OmDan(1906, 3194, 2549, 2438, "10danv2"),
      new OmDan(1525, 4760, 2401, 4279, "ldan"),
      new OmDan(1761, 2307, 2923, 3453, "ldanv2"),
      new OmDan(2695, 3131, 3118, 3350, "tdan"),
      new OmDan(1656, 2540, 2778, 2708, "tdanv2"),
      new OmDan(3037, 2859, 2411, 2708, "tdanv3"),
    ];
    log.log("INFO", "DanCalculator", "初始化Om段数据");
  }

  calculate(type, danName, accValues, mode = "normal") {
    const dataMap = {
      ma: this.maData,
      ln: this.lnData,
      reform: this.reformData,
      om: this.omData,
    };

    const target = dataMap[type]?.find((d) => d.m_danName === danName);
    if (!target) throw new Error("段位不存在");

    const notes = this._getNotes(target, type, mode);

    return {
      normal: this._normalCalc(accValues, notes),
      backstep: this._backstepCalc(accValues, notes),
      totalNotes: notes.reduce((a, b) => a + b, 0),
    };
  }

  // 获取结构化数据
  getSegmentInfo(type) {
    const map = {
      ma: this.maData,
      ln: this.lnData,
      reform: this.reformData,
      om: this.omData,
    };

    return (
      map[type]?.map((item) => ({
        name: item.m_danName,
        notes: [item.m_key1, item.m_key2, item.m_key3, item.m_key4],
        ...(item.m_lnKey1 && {
          lnNotes: [
            item.m_key1 + item.m_lnKey1,
            item.m_key2 + item.m_lnKey2,
            item.m_key3 + item.m_lnKey3,
            item.m_key4 + item.m_lnKey4,
          ],
        }),
        ...(item.m_name1 && {
          songs: [item.m_name1, item.m_name2, item.m_name3, item.m_name4],
        }),
      })) || []
    );
  }

  // 私有方法
  _getNotes(target, type, mode) {
    if (type === "ln" && mode === "v2") {
      return [
        target.m_key1 + target.m_lnKey1,
        target.m_key2 + target.m_lnKey2,
        target.m_key3 + target.m_lnKey3,
        target.m_key4 + target.m_lnKey4,
      ];
    }
    return [target.m_key1, target.m_key2, target.m_key3, target.m_key4];
  }

  _normalCalc(accArr, noteArr) {
    const totalNotes = noteArr.reduce(
      (acc, cur, i) => [...acc, (acc[i - 1] || 0) + cur],
      [],
    );
    return accArr.map((acc, i) => {
      const prevTotal = i > 0 ? totalNotes[i - 1] * accArr[i - 1] : 0;
      return Number(
        ((totalNotes[i] * acc - prevTotal) / noteArr[i]).toFixed(2),
      );
    });
  }

  _backstepCalc(accArr, noteArr) {
    const totalNotes = noteArr.reduce(
      (acc, cur) => [...acc, (acc[acc.length - 1] || 0) + cur],
      [],
    );
    return totalNotes.map((sum, i) => {
      const currentNotes = noteArr.slice(0, i + 1);
      const weightedSum = currentNotes.reduce(
        (s, n, j) => s + n * accArr[j],
        0,
      );
      return Number((weightedSum / sum).toFixed(2));
    });
  }
}

class CLIInterface {
  static rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  static question = promisify(CLIInterface.rl.question).bind(CLIInterface.rl);
  static close() {
    CLIInterface.rl.close();
  }
}
  static async selectDanType() {
    log.log("INFO", "DanCalculator", "执行selectDanType函数");
    console.log(colors.cyan("请选择段位类型"));
    console.log("1. Ma段");
    console.log("2. Om段");
    console.log("3. Reform段");
    console.log("4. Ln段");

    const typeMap = {
      1: "ma",
      2: "om",
      3: "reform",
      4: "ln",
    };

    while (true) {
      const input = await question("请输入序号：");
      if (typeMap[input]) return typeMap[input];
      console.error("无效的输入");
    }
  }

  static async selectDanLevel(danData) {
    log.log("INFO", "DanCalculator", "执行selectDanLevel函数");
    console.log("\n" + colors.cyan("请输入四首曲目的ACC"));

    const accValues = [];
    for (let i = 1; i <= 4; i++) {
      while (true) {
        const input = await question(colors.yellow("`第${i}首ACCA：`"));
        const value = parseFloat(input);

        if (!isNaN(value) && value >= 0 && value <= 100) {
          accValues.push(value);
          break;
        }
        console.error("无效的输入");
      }
    }
    log.log("INFO", "DanCalculator", "selectDanLevel函数结束");
    return accValues;
  }

  static displayResult(result) {
    log.log("INFO", "DanCalculator", "执行displayResult函数");
    console.log("\n" + colors.cyan("计算结果："));
    console.log(
      colors.cyan("普通算法要求："),
      result.normal.map((v) => `${v.toFixed(2)}%`).join(" → "),
    );
    console.log(
      colors.magenta("逆推验证结果："),
      result.backstep.map((v) => `${v.toFixed(2)}%`).join(" → "),
    );
    console.log(colors.yellow("总音符数："), result.totalNotes);
    log.log("INFO", "DanCalculatorn", "displayResult结束");
  }

  static close() {
    rl.close();
  }
}

module.exports = { DanCalculator, CLIInterface };
