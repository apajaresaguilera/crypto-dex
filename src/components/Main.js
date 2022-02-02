import React, { useState, useEffect } from 'react';
import ethLogo from '../assets/ETH.png'
import dopeLogo from '../assets/DOPE.png'
import {ethers} from 'ethers';
import tokenContractJson from '../abis/tokenContractAbi.json';
import exchangeContractJson from '../abis/exchangeContractAbi.json';
const {ethereum} = window;

export default function Main() {
  const [firstCoin, setFirstCoin] = useState(ethLogo);
  const [secondCoin, setSecondCoin] = useState(dopeLogo);
  const [nameOne, setNameOne] = useState("ETH");
  const [nameTwo, setNameTwo] = useState("DOPE");
  const [ethBalance, setethBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [upperBalance, setshowedBalanceOne] = useState("0");
  const [lowerBalance, setshowedBalanceTwo] = useState("0");

  const provider =  new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContractAddress = "0xE576055062E70Db246A8388a792024365ee74E88";
  const exchangeContractAddress = "0x5D87560F962E377a723ffc0B1B7c61100b6a4d8E";
  const [tokenContract, setTokenContract] = useState(new ethers.Contract(tokenContractAddress, tokenContractJson.abi, signer));
  const [exchangeContract, setexchangeContract] = useState(new ethers.Contract(exchangeContractAddress, exchangeContractJson.abi, signer));
  
  const [account, setAccount] = useState("");
  async function computeBalance(value) {
    console.log(value)
    if(0!=parseFloat(value)){
      if(nameOne == "DOPE"){
        const amount = await exchangeContract.getEthAmount(parseInt(value));
        
        document.getElementById("text2").value =ethers.utils.formatEther(amount.toString()) ;
      
      }else{
        const amount = await exchangeContract.getTokenAmount(ethers.utils.parseEther(value));
        console.log(amount.toString())
        document.getElementById("text2").value = amount.toString();
      
      }
    }
  } 
  
  const getBalances = async (acc) => {
    const tokenBal = await tokenContract.balanceOf(acc)
    setTokenBalance(tokenBal.toString());
    const ethBal = await provider.getBalance(acc);
    setethBalance(ethers.utils.formatEther(ethBal))
     

  }
  const isMetaMaskConnected = async () => {
   

    //console.log('checking...')
    const accounts = await provider.listAccounts();
    if(accounts.length > 0){
        setAccount(accounts[0]);
        getBalances(accounts[0]);
        const value = await tokenContract.balanceOf(accounts[0]);
        console.log(value.toString())

    }else{
        setAccount("");
    }
}
  const handleAllow = async () => {
    var inputVal = document.getElementById("textAllow").value;
    const approveTx = await tokenContract.approve(exchangeContractAddress, inputVal);
    await approveTx.wait();
    alert("Approved allowance of " + inputVal + " tokens!")
    document.getElementById("textAllow").value = "";
  };
  const changeTokenPlaces = () => {
    var aux = tokenBalance;
    setTokenBalance(ethBalance);
    setethBalance(aux);
    var aux2 = firstCoin;
    setFirstCoin(secondCoin);
    setSecondCoin(aux2);
    var aux3 = nameOne;
    setNameOne(nameTwo);
    setNameTwo(aux3);
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
  };
  const handleAccountsChanged = (accounts) => {
      isMetaMaskConnected();
  };
  const handleSwap = async () => {
    const amount = document.getElementById("text1").value.toString();
    if(nameOne == "DOPE"){
      const tx = await exchangeContract.swapTokenForEth(parseFloat(amount));
      await tx.wait();
      alert("Swapped " + amount + " tokens for ETH!")
      
    }else{
      const tx = await exchangeContract.swapEthForToken({value: ethers.utils.parseEther(amount.toString())});
      await tx.wait();
      alert("Swapped " + amount + " ETH for tokens!")
    
    }
  }
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
          <input onChange={e => computeBalance(e.target.value)} type="text" id="text1"  className='text1' placeholder="0.0"/>
                <div className="selection">
                <img className='logo1'  src={firstCoin} alt="Coin" />
                  <h6>{nameOne}</h6>
                </div>
             
              <h6 className='balance1'>Balance: {upperBalance}</h6>
          </div>
          <div onClick={changeTokenPlaces} className="arrow-container">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="amount-container cont2">
          <input disabled={true} type="text" id='text2' className='text2'  placeholder="0.0"/>
          <div className="selection2">
            <img className='logo2'  src={secondCoin} alt="Coin" />
            <h6>{nameTwo}</h6>

            
          </div>
              
             
          <h6 className='balance2'>Balance: {lowerBalance}</h6>
          </div>
          <button className='btn btn-swap' onClick={handleSwap}>Swap!</button>
          <input  type="text"  className='textAllow' id='textAllow' placeholder="0.0"/>
          <button className='btn btn-allow' onClick={ handleAllow}>Allow</button>

      </div>
  </div>;
}
