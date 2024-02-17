// 체인 연결
const { Web3 } = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://1rpc.io/3J72Y44BVVGxqtnk5/holesky`)
);
web3.eth.net
  .isListening()
  .then(() => console.log("is connected"))
  .catch((e) => console.log("Wow. Something went wrong"));

module.exports = {
  web3,
};
