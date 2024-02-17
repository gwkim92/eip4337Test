require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
      viaIR: true,
      outputSelection: {
        "*": {
          "*": [
            "evm.bytecode",
            "evm.deployedBytecode",
            "devdoc",
            "userdoc",
            "metadata",
            "abi",
          ],
        },
      },
    },
  },
  networks: {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/VPPnHH8VY3JusSZOsfv0hQilBp1ymi75",
      accounts: [
        `0x055a6eb3657385dd107394ba89bab9a4a45bddc01d0bce3c13dfa3754acae1c5`,
        `0x550226e2ff6a78520e7b5f747441781b043e273cfcb106dc470aba8b48383b17`,
        `0x59ab3fe91e012b6f949d1e600b4704d1f172d4bac42e9bbd882b7ef7b6f431ba`,
      ],
    },
    holesky: {
      url: "https://1rpc.io/3J72Y44BVVGxqtnk5/holesky",
      accounts: [
        `0x055a6eb3657385dd107394ba89bab9a4a45bddc01d0bce3c13dfa3754acae1c5`,
        `0x550226e2ff6a78520e7b5f747441781b043e273cfcb106dc470aba8b48383b17`,
        `0x59ab3fe91e012b6f949d1e600b4704d1f172d4bac42e9bbd882b7ef7b6f431ba`,
      ],
    },
  },
};
