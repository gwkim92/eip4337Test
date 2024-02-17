// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "./UserOperation.sol";

interface IAccount {

    /**
     * 사용자의 서명과 nonce를 검증합니다.
     * 이 검증 호출이 성공적으로 반환되는 경우에만 entryPoint가 수신자에게 호출을 합니다.
     * 서명 실패는 SIG_VALIDATION_FAILED (1)을 반환함으로써 보고되어야 합니다.
     * 이는 유효한 서명 없이 "시뮬레이션 호출"을 가능하게 합니다.
     * 기타 실패(예: nonce 불일치 또는 유효하지 않은 서명 형식)는 여전히 실패를 신호하기 위해 되돌려야 합니다.
     *
     * @dev 반드시 호출자가 entryPoint인지 검증해야 합니다.
     *      반드시 서명과 nonce를 검증해야 합니다.
     * @param userOp 실행될 예정인 작업입니다.
     * @param userOpHash 사용자의 요청 데이터의 해시입니다. 서명의 기초로 사용될 수 있습니다.
     * @param missingAccountFunds entrypoint의 계정 예치금에서 부족한 자금입니다.
     *      이는 호출을 할 수 있게 하기 위해 발신자(entryPoint)에게 이전해야 하는 최소 금액입니다.
     *      초과분은 미래의 호출을 위해 entrypoint에 예치금으로 남습니다.
     *      "entryPoint.withdrawTo()"를 사용하여 언제든지 인출할 수 있습니다.
     *      요청에 paymaster가 있는 경우(또는 현재 예치금이 충분히 높은 경우), 이 값은 0이 됩니다.
     * @return validationData 패키지된 ValidationData 구조체입니다. `_packValidationData` 및 `_unpackValidationData`를 사용하여 인코딩 및 디코딩합니다.
     *      <20-byte> sigAuthorizer - 유효한 서명의 경우 0, 서명 실패를 표시하기 위해 1,
     *         그 외의 경우, "authorizer" 계약의 주소입니다.
     *      <6-byte> validUntil - 이 작업이 유효한 마지막 타임스탬프입니다. "무기한"의 경우 0입니다.
     *      <6-byte> validAfter - 이 작업이 유효한 첫 번째 타임스탬프입니다.
     *      계정이 시간 범위를 사용하지 않는 경우, 서명 실패에 대해 SIG_VALIDATION_FAILED 값(1)을 반환하는 것으로 충분합니다.
     *      검증 코드는 block.timestamp(또는 block.number)를 직접 사용할 수 없습니다.
     */
    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external returns (uint256 validationData);
}