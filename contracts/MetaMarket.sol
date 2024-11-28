pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TransactionHandler {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function transferTokens(address recipient, uint256 amount) external {
        require(IERC20(tokenAddress).balanceOf(address(this)) >= amount, "Insufficient balance in contract");
        bool success = IERC20(tokenAddress).transfer(recipient, amount);
        require(success, "Token transfer failed");
    }

    function depositTokens(uint256 amount) external {
        bool success = IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
    }

    function checkContractTokenBalance() external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}