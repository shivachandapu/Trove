import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import FileContainer from './FileContainer';
import Web3 from 'web3';
import Drive from '../artifacts/contracts/Drive.sol/Drive.json';

const Dashboard = () => {
  // State Variables
  const [sideBarOption, setSideBarOption] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially
  const [reRender, setReRender] = useState(0);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);


  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to work with the Application!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contractAddress = "0x53152B8329CF2f9eE290C7d0Fae8CBAa614723DD";
    const _contract = new web3.eth.Contract(Drive.abi, contractAddress);
    setContract(_contract);
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);


  return (
    <div >
      {/* Header */}
      <Header
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="main-flex">
        {/* Side Bar */}
        <SideBar
          setSideBarOption={setSideBarOption}
          reRender={reRender}
          setReRender={setReRender}
          contract={contract}
          account={account}
        />
        {/* FileContainer */}
        <FileContainer
          sideBarOption={sideBarOption}
          reRender={reRender}
          setReRender={setReRender}
          contract={contract}
          account={account}
        />
      </div>
    </div>
  );
};

export default Dashboard;
