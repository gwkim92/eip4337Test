const { ethers } = require("ethers");
const { getContractInfo } = require("../controller/getContractInfo");
require("dotenv").config();
const { web3 } = require("./web3Connection");
let entryPointContract;

(async () => {
  const entryPointContract = await getContractInfo("EntryPoint");
  const entryPointAddress = entryPointContract.contract_address;
  const entryPointABI = entryPointContract.contract_abi;

  entryPointContract = new web3.eth.Contract(entryPointABI, entryPointAddress);
})();

// UserOperation 객체 검증 함수
const validateUserOperation = (userOperation) => {
  // UserOperation 객체의 구조, 서명, nonce 등을 검증하는 로직 구현
  if (
    !userOperation ||
    !userOperation.data ||
    typeof userOperation.nonce !== "number"
  ) {
    return false;
  }
  // 추가적인 검증 로직 필요, 예를 들어 서명의 유효성 검증 등
  return true;
};

// UserOperation 객체를 처리하고 블록체인에 전송하는 함수
const processUserOperation = async (userOperation) => {
  if (!validateUserOperation(userOperation)) {
    throw new Error("Invalid UserOperation");
  }

  // handleOps 함수 호출을 위한 UserOperation 객체 배열 준비
  const userOperations = [userOperation]; // 단일 UserOperation 객체를 배열로 변환

  // handleOps 호출
  const tx = await entryPointContract.methods
    .handleOps(userOperations, process.env.BENEFICIARY_ADDRESS) // BENEFICIARY_ADDRESS는 수수료를 받을 주소
    .send({ from: process.env.OWNER_ADDRESS }); // OWNER_ADDRESS는 트랜잭션을 발생시킬 주소

  return tx.transactionHash; // 트랜잭션 해시 반환
};
module.exports = {
  validateUserOperation,
  processUserOperation,
};
