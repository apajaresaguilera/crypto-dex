// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange is Ownable{
    address tokenAddress;
    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
    }


    function addLiquidity(uint256 _tokenAmount) public payable{
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), _tokenAmount);
    }


    function getTokenEquivalence(address _tokenA, address _tokenB, uint256 _tokenAInput) public view returns(uint256) {
        //This formula calculates the invariant. We want to follow (x+dX)*(y-dY) = k, where k = x*y.
        //So we get: (x+dX)*(y-dY) = x*y
        //We want the dY value, so we get: dY=(y*dX)/x+dX
        return (getReserve(_tokenB)*_tokenAInput)/(getReserve(_tokenA)+_tokenAInput);
    }

    function getReserve(address _tokenAddress) private view returns(uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function getAmount(uint256 inputAmount,uint256 inputReserve,uint256 outputReserve) private pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        return (inputAmount * outputReserve) / (inputReserve + inputAmount);
    }

    function getTokenAmount(uint256 _ethAmount) public view returns (uint256) {
        require(_ethAmount > 0, "ETH amount can't be 0");

        uint256 tokenReserve = getReserve(tokenAddress);

        return getAmount(_ethAmount, address(this).balance, tokenReserve);
    }

    function getEthAmount(uint256 _tokenAmount) public view returns (uint256) {
        require(_tokenAmount > 0, "Token amount is too small");

        uint256 tokenReserve = getReserve(tokenAddress);

        return getAmount(_tokenAmount, tokenReserve, address(this).balance);
    }
    function swapEthForToken() public payable {
        uint256 tokens = getTokenAmount(msg.value);
        IERC20(tokenAddress).transferFrom(address(this), msg.sender, tokens);
    }
    function swapTokenForEth(uint256 _tokenAmount) public {
        uint256 totalEth = getEthAmount(_tokenAmount);
        payable(msg.sender).transfer(totalEth);

    }

    function allow(uint256 _tokenAmount) public{
        IERC20(tokenAddress).approve(address(this), _tokenAmount);                           
    }
}