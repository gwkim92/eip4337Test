const db = require("../../database/models");
const ContractInfo = db.contractInfo;

async function getContractInfo(name) {
  const contractInfo = await ContractInfo.findOne({
    where: { contract_name: name },
  });
  return contractInfo;
}

module.exports = {
  getContractInfo,
};
