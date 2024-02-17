//ToDo
// 트랜잭션에 필요한 함수들 모듈화
//checkNonce, gasEstimate, 1559, etc..
require("dotenv").config();
const { web3 } = require("../utils/web3Connection");
const { calculateFees } = require("./gasFeeCalculate");
const { ethers } = require("ethers");

const domain = {
  name: "UserOperation",
  version: "1",
  chainId: 1, // 사용하는 네트워크의 체인 ID로 변경해야 합니다.
  verifyingContract: "0xa9eD979A9D36E228d1Ae651eb40a27Da7fd9f02F", // EntryPoint 컨트랙트 주소로 변경해야 합니다.
};

// EIP-712 타입 구조체 정의
const types = {
  UserOperation: [
    { name: "sender", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "initCode", type: "bytes" },
    { name: "callData", type: "bytes" },
    { name: "callGasLimit", type: "uint256" },
    { name: "verificationGasLimit", type: "uint256" },
    { name: "preVerificationGas", type: "uint256" },
    { name: "maxFeePerGas", type: "uint256" },
    { name: "maxPriorityFeePerGas", type: "uint256" },
    { name: "paymasterAndData", type: "bytes" },
    { name: "signature", type: "bytes" },
  ],
};

async function getNonce(address) {
  return await web3.eth.getTransactionCount(address, "latest");
}

// Create a transaction object
async function createTransaction(to, value, data) {
  return {
    to: to,
    value: value === "0" ? "0x0" : web3.utils.toWei(value.toString(), "ether"),
    data: data,
  };
}

// Estimate gas for a transaction
async function estimateGas(tx) {
  try {
    return await web3.eth.estimateGas(tx);
  } catch (error) {
    console.error(`Failed to estimate gas: ${error}`);
  }
}

async function createAndSignUserOperation(from, to, value, data, privateKey) {
  const gasFee = await calculateFees();
  const Nonce = await getNonce(from);
  const tx = await createTransaction(to, value, data);
  const maxPriorityToGwei = web3.utils.fromWei(
    gasFee.fastMaxPriorityFeePerGas.toString(),
    "gwei"
  );
  const maxFeeToGwei = web3.utils.fromWei(
    gasFee.fastMaxFeePerGas.toString(),
    "gwei"
  );
  console.log("gwei : ", maxPriorityToGwei);
  console.log("gwei : ", maxFeeToGwei);
  console.log("createTransaction :", tx);
  const gasLimit = await estimateGas(tx);
  console.log("gasLimit : ", gasLimit);

  const userOperation = {
    sender: from,
    nonce: Nonce,
    initCode: "0x", // 계정 생성이 필요한 경우 여기에 초기화 코드를 넣습니다.
    callData: data,
    callGasLimit: gasLimit, // 실제 가스 한도는 추후 추정됩니다.
    verificationGasLimit: 0, // 검증에 필요한 가스 한도입니다.
    preVerificationGas: 21000, // 트랜잭션 전 처리에 필요한 기본 가스입니다.
    maxFeePerGas: gasFee.fastMaxFeePerGas,
    maxPriorityFeePerGas: gasFee.fastMaxPriorityFeePerGas,
    paymasterAndData: "0x", // 페이마스터를 사용하는 경우 여기에 정보를 넣습니다.
    signature: "0x", // 사용자가 서명한 후 여기에 서명을 넣습니다.
  };

  web3.utils.encodePacked;
  const packedValue = ethers.AbiCoder.encode(
    [
      "address",
      "uint256",
      "bytes",
      "bytes",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "bytes",
    ],
    [
      userOperation.sender,
      userOperation.nonce,
      userOperation.initCode,
      userOperation.callData,
      userOperation.callGasLimit,
      userOperation.verificationGasLimit,
      userOperation.preVerificationGas,
      userOperation.maxFeePerGas,
      userOperation.maxPriorityFeePerGas,
      userOperation.paymasterAndData,
    ]
  );
  console.log(packedValue);
  const userOpHash = ethers.keccak256(packedValue);

  const entryPointAddress = "0xa9eD979A9D36E228d1Ae651eb40a27Da7fd9f02F";
  const chainId = "?";
  // return userOperation;
  const finalHash = ethers.keccak256(
    ethers.AbiCoder.encode(
      ["bytes32", "address", "uint256"],
      [userOpHash, entryPointAddress, chainId]
    )
  );

  return finalHash;
}

// async function signUserOperation(userOperation, privateKey) {
//   const signer = new ethers.Wallet(privateKey);

//   // EIP-712 서명 데이터 준비
//   const dataToSign = {
//     types: types,
//     domain: domain,
//     primaryType: "UserOperation",
//     message: userOperation,
//   };

//   // EIP-712 서명 생성
//   const signature = await signer._signTypedData(domain, types, userOperation);
//   return signature;
// }

async function signTransaction(finalHash, privateKey) {
  const signer = new ethers.Wallet(privateKey); // privateKey는 사용자의 개인 키입니다.
  const signature = await signer.signMessage(ethers.getBytes(finalHash));

  return signature;
}

async function sendSignedTransaction(rawTransaction) {
  return await web3.eth.sendSignedTransaction(rawTransaction);
}

module.exports = {
  createEIP1559Tx,
  signTransaction,
  sendSignedTransaction,
};
