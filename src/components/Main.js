import React, { useState } from 'react';
import ethLogo from '../assets/ETH.png'
import daiLogo from '../assets/DAI.png'
import uniLogo from '../assets/UNI.png'

export default function Main() {

  const [firstCoin, setFirstCoin] = useState(ethLogo);
  const [secondCoin, setSecondCoin] = useState(ethLogo);
  function checkCoin(which, coinName) {
    switch (coinName) {
      case "ETH":
        if(which==0){
          setFirstCoin(ethLogo);
        }else{
          setSecondCoin(ethLogo);
        }
       
        break;
        case "DAI":
          if(which==0){
            setFirstCoin(daiLogo);
          }else{
            setSecondCoin(daiLogo);
          }

        
        break;
        case "UNI":
          if(which==0){
            setFirstCoin(uniLogo);
          }else{
            setSecondCoin(uniLogo);
          }

        
        break;
    
      default:
        break;
    }
  }
  
  return <div className='main-container'>
      <div className="glass-container">
          <div className="amount-container cont1">
          <input type="text"  className='text1' placeholder="0.0"/>
                <div className="selection">
                <img  src={firstCoin} alt="Coin" />
                  <select onChange={(event) =>  checkCoin(0, event.target.value)} id="input1" name="input1" className='input1'>
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="UNI">UNI</option>
                  </select>
                </div>
             
              <h6 className='balance1'>Balance: </h6>
          </div>
          <div className="arrow-container">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div className="amount-container cont2">
          <input type="text"  className='text2' placeholder="0.0"/>
          <div className="selection2">
            <img  src={secondCoin} alt="Coin" />
            <select onChange={(event) =>  checkCoin(1, event.target.value)}  id="cars" name="input2" className='input2'>
                  <option value="ETH">ETH</option>
                  <option value="DAI">DAI</option>
                  <option value="UNI">UNI</option>
              </select>
          </div>
              
             
          <h6 className='balance2'>Balance: </h6>
          </div>
          <button className='btn btn-swap'>Swap!</button>

      </div>
  </div>;
}
