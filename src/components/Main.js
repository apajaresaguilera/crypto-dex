import React, { useState, useEffect } from 'react';
import ethLogo from '../assets/ETH.png'
import dopeLogo from '../assets/DOPE.png'
import {ethers} from 'ethers';
import tokenContractJson from '../abis/tokenContractAbi.json';
import exchangeContractJson from '../abis/exchangeContractAbi.json';
const {ethereum} = window;

export default function Main() {
  const [firstCoin, setFirstCoin] = useState(ethLogo);
  const [secondCoin, setSecondCoin] = useState(ethLogo);
  const [signer, setSigner] =  useState(null);
  const [ethBalance, setethBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [showedBalanceOne, setshowedBalanceOne] = useState("");
  const [showedBalanceTwo, setshowedBalanceTwo] = useState("");

  const provider =  new ethers.providers.Web3Provider(window.ethereum);
  const tokenContractAddress = "0x847Cc0FC41deD259438ff0440B692261c515ea44";
  const exchangeContractAddress = "0xa363f54e5BBf4B7Cc3d28A7E5c698ab79C0619E3";
  const [tokenContract, setTokenContract] = useState(new ethers.Contract(tokenContractAddress, tokenContractJson.abi, provider));
  const [exchangeContract, setexchangeContract] = useState(new ethers.Contract(exchangeContractAddress, exchangeContractJson.abi, provider));

  const [account, setAccount] = useState("");

  function checkCoin(which, coinName) {
    switch (coinName) {
      case "ETH":
        if(which==0){
          setFirstCoin(ethLogo);
          setshowedBalanceOne(ethBalance)
        }else{
          setSecondCoin(ethLogo);
          setshowedBalanceTwo(ethBalance)

        }
       
        break;
        case "DOPE":
          if(which==0){
            setFirstCoin(dopeLogo);
          setshowedBalanceTwo(tokenBalance)

          }else{
            setSecondCoin(dopeLogo);
          setshowedBalanceTwo(tokenBalance)

          }
        break;
        
    
      default:
        break;
    }
  }
  const getBalances = async (acc) => {
    console.log(acc)
    const tokenBal = await tokenContract.balanceOf(acc)
    setTokenBalance(tokenBal.toString());
    const ethBal = await provider.getBalance(acc);
    setethBalance(ethers.utils.formatEther(ethBal))

  }
  const isMetaMaskConnected = async () => {
    console.log('checking...')
    const accounts = await provider.listAccounts();
    if(accounts.length > 0){
        setAccount(accounts[0]);
        getBalances(accounts[0]);

    }else{
        setAccount("");
    }
}
const handleAccountsChanged = (accounts) => {
    isMetaMaskConnected();
  };
useEffect(()=>{
    ethereum.on('accountsChanged', handleAccountsChanged);
    isMetaMaskConnected();
    return () => {
        window.removeEventListener('accountsChanged',handleAccountsChanged);
      };
}, [])
  return <div className='main-container'>
      <div className="glass-container">
          <div className="amount-container cont1">
          <input type="text"  className='text1' placeholder="0.0"/>
                <div className="selection">
                <img className='logo1'  src={firstCoin} alt="Coin" />
                  <select onChange={(event) =>  checkCoin(0, event.target.value)} id="input1" name="input1" className='input1'>
                    <option value="ETH">ETH</option>
                    <option value="DOPE">DOPE</option>
                    
                  </select>
                </div>
             
              <h6 className='balance1'>Balance: {showedBalanceOne}</h6>
          </div>
          <div className="arrow-container">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div className="amount-container cont2">
          <input type="text"  className='text2' placeholder="0.0"/>
          <div className="selection2">
            <img className='logo2'  src={secondCoin} alt="Coin" />
            <select onChange={(event) =>  checkCoin(1, event.target.value)}  id="cars" name="input2" className='input2'>
                  <option value="ETH">ETH</option>
                  <option value="DOPE">DOPE</option>
              </select>
          </div>
              
             
          <h6 className='balance2'>Balance: {showedBalanceTwo}</h6>
          </div>
          <button className='btn btn-swap'>Swap!</button>

      </div>
  </div>;
}
