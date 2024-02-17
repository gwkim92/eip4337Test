const { web3 } = require("../controller/connection");

const historicalBlocks = 20;

function avg(arr) {
  const sum = arr.reduce((a, v) => a + v);
  return Math.round(sum / arr.length);
}

function formatFeeHistory(result, includePending) {
  let blockNum = result.oldestBlock;
  let index = 0;
  const blocks = [];
  const historicalBlocksBigInt = BigInt(historicalBlocks);
  console.log(typeof blockNum, historicalBlocksBigInt);
  while (blockNum < result.oldestBlock + historicalBlocksBigInt) {
    blocks.push({
      number: blockNum,
      baseFeePerGas: Number(result.baseFeePerGas[index]),
      gasUsedRatio: Number(result.gasUsedRatio[index]),
      priorityFeePerGas: result.reward[index].map((x) => Number(x)),
    });
    blockNum += BigInt(1);
    index += 1;
  }
  if (includePending) {
    blocks.push({
      number: "pending",
      baseFeePerGas: Number(result.baseFeePerGas[historicalBlocks]),
      gasUsedRatio: NaN,
      priorityFeePerGas: [],
    });
  }
  return blocks;
}

async function calculateFees() {
  try {
    const feeHistoryResult = await web3.eth.getFeeHistory(
      historicalBlocks,
      "pending",
      [25, 50, 75]
    );
    const blocks = formatFeeHistory(feeHistoryResult, false);
    const slow = avg(blocks.map((b) => b.priorityFeePerGas[0]));
    const average = avg(blocks.map((b) => b.priorityFeePerGas[1]));
    const fast = avg(blocks.map((b) => b.priorityFeePerGas[2]));

    const block = await web3.eth.getBlock("pending");
    const baseFeePerGas = Number(block.baseFeePerGas);
    return {
      slowMaxPriorityFeePerGas: slow,
      averagePriorityFeePerGas: average,
      fastMaxPriorityFeePerGas: fast,
      slowMaxFeePerGas: slow + baseFeePerGas,
      averageMaxFeePerGas: average + baseFeePerGas,
      fastMaxFeePerGas: fast + baseFeePerGas,
    };
  } catch (error) {
    throw new Error(`Failed to calculate fees: ${error}`);
  }
}
module.exports = {
  calculateFees,
};
