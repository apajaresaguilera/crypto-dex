import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers';

export default function Header() {
    const [account, setAccount] = useState("");
    const provider =  new ethers.providers.Web3Provider(window.ethereum, "any");
    const {ethereum} = window;

    const connectWallet = async () => {
       let account = await ethereum.request({method: 'eth_requestAccounts'})
       setAccount(account)
       return account;
    }
    const isMetaMaskConnected = async () => {
        console.log('checking...')
        const accounts = await provider.listAccounts();
        if(accounts.length > 0){
            setAccount(accounts[0]);
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
    
    return (
        <div className="headerContainer"  >
        
            {account ? 
                 <button type="button" className="btn btn-disable btn-title"  >Connected!</button>
                :
                <button type="button" className="btn btn-title" onClick={connectWallet}>Connect Wallet</button>
            }
            <div className="title-mid"></div> 
            <h3 className="dappTitle title-right" >The DEX 💱</h3>
                
           
        </div>
    )
    
}