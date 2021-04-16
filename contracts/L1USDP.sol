// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import { ERC20PresetMinterPauser } from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract L1USDP is ERC20PresetMinterPauser {

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol
    ) public ERC20PresetMinterPauser(_tokenName, _tokenSymbol) {}
    
}
