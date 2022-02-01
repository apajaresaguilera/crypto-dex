import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import React, {Fragment} from 'react';
function App() {
  return (
    <Fragment> 
      <Header/>
      <Main/>
    </Fragment>
   
  );
}

export default App;
