const { DanCalculator, CLIInterface } = require("./DanCalculator");
const log = require("./GenerateLog");

async function main() {
  try {
    const calculator = new DanCalculator();
    const danType = await CLIInterface.selectDanType();
    const danData = calculator.getSegmentData(danType);
    const selectedDan = await CLIInterface.selectDanLevel(danData);
    const accValues = await CLIInterface.inputAccValues();
    log.log("INFO", "DanCalculator", "初始化成功，创建了 5 个对象");

    const result = calculator.calculate(
      danType,
      selectedDan.m_danName,
      accValues,
    );

    CLIInterface.displayResult(result);
  } catch (err) {
    log.log("ERROR", "DanCalculator", err, true);
  } finally {
    CLIInterface.close();
  }
}

main();
