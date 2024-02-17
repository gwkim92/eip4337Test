// 유저가 사인을 함

async function userOp(
  userAddress,
  calldata,
  estimateGas,
  maxFeePerGas,
  maxPriorityFeePerGas,
  signature
) {
  const userOperation = {
    sender: userAddress,
    nonce: await getNonceForUser(userAddress),
    initCode: "",
    callData: encodeMintFunctionCall(),
    callGasLimit: 100000,
    verificationGasLimit: 200000,
    preVerificationGas: 21000,
    maxFeePerGas: web3.utils.toWei("100", "gwei"),
    maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
    paymasterAndData: "",
    signature: "",
  };
}
