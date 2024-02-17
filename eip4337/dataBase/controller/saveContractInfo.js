const saveContractDB = require("../methods/saveContractInfo");
const { sequelize } = require("../models");

module.exports = {
  contracts: {
    saveContractInfo: async (EntrPointContract, contractAddress, abi) => {
      console.log(
        "saveContractInfo : ",
        EntrPointContract,
        contractAddress,
        abi
      );
      try {
        await sequelize.authenticate();
        console.log("connection to database");

        const result = await saveContractDB.saveContractInfo(
          EntrPointContract,
          contractAddress,
          abi
        );
        console.log("result : ", result);

        return result;
      } catch (error) {
        console.log("error : ", error);
      }
    },
  },
};
