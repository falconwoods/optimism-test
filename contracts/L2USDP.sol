// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { iAbs_BaseCrossDomainMessenger } from "@eth-optimism/contracts/build/contracts/iOVM/bridge/messaging/iAbs_BaseCrossDomainMessenger.sol";

contract L2USDP is ERC20 {
    address l1ERC20DepositAddress;
    iAbs_BaseCrossDomainMessenger internal messenger;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol
    ) public ERC20(_tokenName, _tokenSymbol) {}

    function init(
        address _messenger,
        address _L1ERC20DepositAddress
    ) public {
        require(l1ERC20DepositAddress == address(0), "L2ERC20 instance has already been initalized");
        messenger = iAbs_BaseCrossDomainMessenger(_messenger);
        l1ERC20DepositAddress = _L1ERC20DepositAddress;
    }

    function decimals() public view override returns (uint8) {
        return 18;
    }

    function mint(address _depositor, uint256 _amount) public returns (bool success) {
        require(messenger.xDomainMessageSender() == l1ERC20DepositAddress);
        require(msg.sender == address(messenger), "Only messages relayed by L2CrossDomainMessenger can mint");
        _mint(_depositor, _amount);
        return true;
    }

    function withdraw(uint256 _amount) public {
        _burn(msg.sender, _amount);
        // generate encoded calldata to be executed on L1
        bytes memory message = abi.encodeWithSignature(
            "withdraw(address,uint256)",
            msg.sender,
            _amount
        );

        // send the message over to the L1CrossDomainMessenger!
        messenger.sendMessage(l1ERC20DepositAddress, message, 1000000);
    }
}
