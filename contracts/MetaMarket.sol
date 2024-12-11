// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TransactionHandler {
    IERC20 public token;

    // Event declarations
    event TokensDeposited(address indexed depositor, uint256 amount);
    event TokensTransferred(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    // Transfer tokens with added logging
    function transferTokens(address recipient, uint256 amount) external {
        require(token.balanceOf(address(this)) >= amount, "Insufficient balance in contract");
        require(token.transfer(recipient, amount), "Token transfer failed");
        
        emit TokensTransferred(recipient, amount); // Log the transfer
    }

    // Deposit tokens with added logging
    function depositTokens(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        emit TokensDeposited(msg.sender, amount); // Log the deposit
    }

    // Check contract's token balance
    function checkContractTokenBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}