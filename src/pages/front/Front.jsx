import logo from "../../logo.svg";
import "../../App.css";
import "../../index.css";
import { ethers } from "ethers";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import { lightTheme, darkTheme, GlobalStyles } from "../../themes.js";
import Reactor from "../../Reactor.gif";
import { Copy, Dna, Fire, FireAlt } from "styled-icons/fa-solid";
import { FilePaper } from "styled-icons/remix-fill";
import { motion } from "framer-motion";

function Front() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [logs, setLogs] = useState();
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
  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const result = fetch(
      "https://deep-index.moralis.io/api/v2/0xEE644815E2693c7b2e5230ad924d127546C43207?chain=eth"
    )
      .then((e) => {
        e.json();
      })
      .then((e) => {
        return e;
      });
    setLogs(result);
  }

  function CopyText(info) {
    navigator.clipboard.writeText(info);
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App mx-auto">
        <header className="mx-auto">
          <div className="title px-5 align-middle">
            {/* <img src={logo} className="w-[80px]" alt="logo" /> */}
            <p className="text-6xl gamer tracking-widest text-white my-auto py-2 px-4 rounded-sm absolute z-10 top-[180px] right-0 left-0">
              Mutant Kaiju <br /> Extraction Logs
            </p>
          </div>
          <div className="options">
            {/* {theme === "dark" ? (
              <Sun
                className="w-8 cursor-pointer"
                onClick={() => themeToggler()}
              />
            ) : (
              <Moon
                className="w-8 cursor-pointer text-white"
                onClick={() => themeToggler()}
              />
            )}  */}
          </div>
        </header>
        <img src={Reactor} className="brightness-75 max-w-[1300px]" />
        <div className="mt-[70px]">
          <div className="p-5 h-screen">
            <div className="w-full rounded-sm text-4xl gamer flex mb-10 tracking-widest text-[#2C9370] flex-col text-left">
              <p className="z-10 mb-6">Stats:</p>
              <div className="flex flex-row space-x-8 ml-5">
                <div className="flex-col space-y-3">
                  <p className="z-10 text-xl text-white space-x-3">
                    {" "}
                    <FilePaper className="w-4" />
                    <span>1502</span>
                  </p>
                  <p className="z-10 text-xl text-white space-x-3">
                    <Dna className="w-4" />
                    <span>689</span>
                  </p>
                  <p className="z-10 text-xl text-white space-x-3">
                    <FireAlt className="w-4" />
                    <span>23407</span>
                  </p>
                </div>
                <div className="flex-col space-y-3">
                  <p className="z-10 text-xl text-white space-x-3">
                    <span>Total Attempts</span>
                  </p>
                  <p className="z-10 text-xl text-white space-x-3">
                    <span>Mutants extracted</span>
                  </p>
                  <p className="z-10 text-xl text-white space-x-3">
                    <span>$Scales burnt</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-sm text-4xl gamer flex tracking-widest text-[#2C9370] flex-col">
              <p className="z-10 text-left">Latest extractions: </p>

              <ul className=" z-10 px-5 mt-4 space-y-10 columns-2">
                <li className="z-10 gamer relative text-sm text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-5 rounded-sm space-y-4">
                  <p>User: 0xb7ca98b7a09cb87e0987f</p>
                  <p>Mutant LVL: 3</p>
                  <p>Success Chance: 20%</p>
                  <p>
                    Outcome: <span className="text-green-500">SUCCESS</span>{" "}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-4 absolute top-1 right-5 cursor-pointer"
                  >
                    <Copy onClick={CopyText("0xb7ca98b7a09cb87e0987f")} />
                  </motion.div>
                </li>
                <li className="z-10 gamer relative text-sm text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-5 rounded-sm space-y-4">
                  <p>User: 0xb7ca98b7a09cb87e0987f</p>
                  <p>Mutant LVL: 3</p>
                  <p>Success Chance: 20%</p>
                  <p>
                    Outcome: <span className="text-green-500">SUCCESS</span>{" "}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-4 absolute top-1 right-5 cursor-pointer"
                  >
                    <Copy onClick={CopyText("0xb7ca98b7a09cb87e0987f")} />
                  </motion.div>
                </li>
                <li className="z-10 gamer relative text-sm text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-5 rounded-sm space-y-4">
                  <p>User: 0xb7ca98b7a09cb87e0987f</p>
                  <p>Mutant LVL: 3</p>
                  <p>Success Chance: 20%</p>
                  <p>
                    Outcome: <span className="text-green-500">SUCCESS</span>{" "}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-4 absolute top-1 right-5 cursor-pointer"
                  >
                    <Copy onClick={CopyText("0xb7ca98b7a09cb87e0987f")} />
                  </motion.div>
                </li>
                <li className="z-10 gamer relative text-sm text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-5 rounded-sm space-y-4">
                  <p>User: 0xb7ca98b7a09cb87e0987f</p>
                  <p>Mutant LVL: 3</p>
                  <p>Success Chance: 20%</p>
                  <p>
                    Outcome: <span className="text-green-500">SUCCESS</span>{" "}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-4 absolute top-1 right-5 cursor-pointer"
                  >
                    <Copy onClick={CopyText("0xb7ca98b7a09cb87e0987f")} />
                  </motion.div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer className="bg-[#000000] fixed bottom-0 w-[1300px] text-sm py-1 z-20 px-4 justify-center gamer tracking-widest">
          This website is not affiliated with Augminted Labs, it's a fan-made
          tool created by -<span className="italic">Haruxe</span>- and -
          <span className="italic">Coffee & Weed </span>- for the KaijuKingz
          community.
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Front;
