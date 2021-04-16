// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { iAbs_BaseCrossDomainMessenger } from "@eth-optimism/contracts/build/contracts/iOVM/bridge/messaging/iAbs_BaseCrossDomainMessenger.sol";

contract L1USDPDeposit {
    address l2ERC20Address;
    IERC20 l1ERC20;
    iAbs_BaseCrossDomainMessenger internal messenger;

    constructor (
        address _L1ERC20Address,
        address _L2ERC20Address,
        address _messenger
    ) public {
        l1ERC20 = IERC20(_L1ERC20Address);
        l2ERC20Address = _L2ERC20Address;
        messenger = iAbs_BaseCrossDomainMessenger(_messenger);
    }

    function deposit(
        address _depositer,
        uint256 _amount
    ) public {
        l1ERC20.transferFrom(
            _depositer,
            address(this),
            _amount
        );

        // Generate encoded calldata to be executed on L2.
        bytes memory message = abi.encodeWithSignature(
            "mint(address,uint256)",
            _depositer,
            _amount
        );
        messenger.sendMessage(l2ERC20Address, message, 1000000); //TODO: meter this, find a lower-bounded value
    }

    function withdraw(
        address _withdrawer,
        uint256 _amount
    ) public {
        require(l2ERC20Address == messenger.xDomainMessageSender());
        require(msg.sender == address(messenger), "Only messages relayed by the L1CrossDomainMessenger can withdraw");
        l1ERC20.transfer(_withdrawer, _amount);
    }
}