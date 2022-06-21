import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import styled, { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

const StyledApp = styled.div`
`

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  /*
  const [currentNetwork, setCurrentNetwork] = useState(null);
  var actualBlock = null;
  var lastBlock = null;
  const setWeb3Listener = async () => {
    const { ethereum } = window;
    if (!ethereum) { console.log("Make sure you have Metamask installed!"); return;
    }
    window.provider = new ethers.providers.Web3Provider(ethereum, "any");
    window.provider.pollingInterval = 1000;
    var network = await window.provider.getNetwork();
    if(network["name"] == "homestead"){
      setCurrentNetwork("mainnet");
    } else { 
      console.log("Not connected to the Ethereum mainnet.");
      setCurrentNetwork(null);
    }
    const abi = ['event ExtractionComplete(uint256 indexed mutantId, uint256 indexed batchId, uint16 indexed boostId, ExtractionResults results)'];
    const contractAddress = '0xB0E0698F196E16cd353D409fb19E3536076B7CaE';
    window.contract = new ethers.Contract(contractAddress, abi, window.provider);
    window.contract.on("ExtractionComplete", (data) => {
      console.log(data)
    })
  };
  function blockProcess(blockNumber) {
    if(blockNumber <= actualBlock) { return }
    lastBlock = actualBlock
    actualBlock = blockNumber;
    console.log("last:"+lastBlock+" - actual:"+actualBlock+" - *:"+blockNumber);
    if(lastBlock == blockNumber && lastBlock != null){ return }
    console.log(blockNumber);
  }
  */
  const themeToggler = () => {
    var new_theme = null;
    theme === "dark" ? new_theme = "light" : new_theme = "dark";
    localStorage.setItem("theme", new_theme);
    setTheme(new_theme);
  }
  useEffect(() => {
/*    setWeb3Listener();
    window.provider.on("block", (blockNumber) => { 
      blockProcess(blockNumber) 
    });*/
  }, [])
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
      <StyledApp>
        <div className="App">
          <header className="App-header">
            <div className="title">
              <img src={logo} className="App-logo" alt="logo" />
              <p className="title_1">[ TERMINAL 1337 ]</p> 
              <p className="title_2">Extractions Logs</p>
            </div>
            <div className="options">
              <img className="theme" src="theme.png" onClick={() => themeToggler()}/>
            </div>
          </header>
          <div className="App-body">
            <div className="content">
              <div className="content_stats">
                <p>Stats</p>
              </div>
              <div className="content_list">
                <p>Latest extractions: </p>
              </div>
            </div>
          </div>
          <footer className="App-footer">
            This website is not affiliated with Augminted Labs, it's a fan-made tool for the KaijuKingz community. 
          </footer>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
