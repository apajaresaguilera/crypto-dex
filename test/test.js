const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", function () {
  it("Should return value of address", async function () {
    const Exchange = await ethers.getContractFactory("Exchange");
    const exchangeContract = await Exchange.deploy();
    await exchangeContract.deployed();
    const Token = await ethers.getContractFactory("Token");
    const tokenContract = await Token.deploy();
    await tokenContract.deployed();
    tokenContract.transfer(0x70997970c51812dc3a010c7d01b50e0d17dc79c8, 20);
    
    expect(await exchangeContract.balanceOf(tokenContract.address)).to.equal();

  
  }); 
});
