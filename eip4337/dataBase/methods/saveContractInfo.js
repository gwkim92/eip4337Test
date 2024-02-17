const db = require("../models");
const TokenContract = db.contractInfo;

async function saveContractInfo(contract_name, contract_address, contract_abi) {
  try {
    const [result, created] = await TokenContract.upsert(
      {
        contract_name: contract_name,
        contract_address: contract_address,
        contract_abi: contract_abi,
      },
      { returning: true }
    );

    if (created) {
      console.log("Contract created successfully.");
    } else {
      console.log("Contract updated successfully.");
    }

    return result;
  } catch (err) {
    console.error("Failed to save or update contract:", err);
  }
}

module.exports = {
  saveContractInfo,
};
