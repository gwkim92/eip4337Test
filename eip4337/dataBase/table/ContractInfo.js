const Sequelize = require("sequelize");

module.exports = class ContractInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        contract_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contract_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contract_abi: {
          type: Sequelize.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "contractinfos",
        timestamps: true,
      }
    );
  }
};
