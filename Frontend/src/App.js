import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./components/login";
import Register from './components/register';
import Web3 from "web3";
import { ethers} from 'ethers';
import { ContractABI } from "./abi";


function App()
{ 
  const [contract,setContract] = useState({}); // To store the contract
  const [account, setAccount] = useState(""); // To store the account details
  
  //Function to connect Frontend to Smart Contract
  const connect = async() =>
  {
    const ganacheUrl = 'http://localhost:7545'; // Update with your Ganache URL
    const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
    const privateKey = '0x89889a37019c94380a9a75f215c89bf8953a2fdecb441f039262f3e0e8cac3b3'; // Replace with your private key
    const signer = new ethers.Wallet(privateKey, provider);
    const RemixContract = new ethers.Contract("0x79374E120947410b2D9A161C6Bad946b4dC14F68", ContractABI, signer); //Replace with the block address where smart contract is deployed
    for( let key in RemixContract)
      {
        contract[key] = RemixContract[key];
      }
    console.log("Contract: ",contract);
  }

  //Call function connect() as the page renders
  useEffect(() => {connect()},[]);

  //Function to connect to wallet
  const connectToWallet = async() =>
  {
    let provider = window.ethereum;
    if(typeof provider !== "undefined")
    {
      provider.request({method: "eth_requestAccounts"});
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const acc = accounts[0];
      setAccount(acc);
      console.log(account);
    }
  }

  return (
    <>
      <p id="welcome"> SMART ELECTRICITY</p>
      <p id="welcome_2"> Blockchain based smart energy meter </p>
      { account!=="" ?
        (
          <>
            <p class="connect" id="account"><b>Account:</b> {account}</p>
          </>
        ):
        (
          <>
            <div class="connect" id="account">
              <button onClick={connectToWallet} class="btn btn-primary">Connect To Wallet</button>
            </div>
          </>
        )
      }
      <nav class="logreg">
        <Link to="/login">Login</Link><br></br>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login data = {{contract,account}}/>} />
        <Route path="/register" element={<Register data = {{contract,account}}/>} />
      </Routes>
  </>
  );
}

export default App;
