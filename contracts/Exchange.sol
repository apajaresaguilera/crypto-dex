// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange is Ownable{
    //Swap tokens 
    //Stake tokens
    constructor() {
    }


    function addPairLiquidity(address _tokenA, address _tokenB, uint256 _tokenAAmount, uint256 _tokenBAmount) public {
        require(_tokenA != address(0), "invalid token address");
        require(_tokenB != address(0), "invalid token address");

        IERC20 tokenA = IERC20(_tokenA);
        tokenA.transferFrom(msg.sender, address(this), _tokenAAmount);

        IERC20 tokenB = IERC20(_tokenB);
        tokenB.transferFrom(msg.sender, address(this), _tokenBAmount);
    }


    function getTokenBalance(address _tokenAddress) public view returns(uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }


    function getTokenEquivalence(address _tokenA, address _tokenB, uint256 _tokenAInput) public {
        //This formula calculates the invariant. We want to follow (x+dX)*(y-dY) = k, where k = x*y.
        //So we get: (x+dX)*(y-dY) = x*y
        //We want the dY value, so we get: dY=(y*dX)/x+dX
        return (getReserve(_tokenB);*_tokenAInput)/(getReserve(_tokenA)+_tokenAInput);
    }

    function getReserve(address _tokenAddress) private view returns(uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

}