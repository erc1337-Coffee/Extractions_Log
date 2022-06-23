import logo from "../../logo.svg";
import "../../App.css";
import "../../index.css";
import { ethers } from "ethers";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import { lightTheme, darkTheme, GlobalStyles } from "../../themes.js";
import Reactor from "../../Reactor.gif";
import { Copy, Dna, Fire, FireAlt } from "styled-icons/fa-solid";
import { Discord, FilePaper, Twitter } from "styled-icons/remix-fill";
import { motion } from "framer-motion";
import { DiscordAlt } from "styled-icons/boxicons-logos";
import { Money } from "styled-icons/boxicons-regular";
import { Nuclear } from "styled-icons/ionicons-sharp";
import loading from "../../Infinite.gif";
import loadingPH from "../../InfinitePH.png";
import { Refresh } from "styled-icons/evil";

function Front() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [logs, setLogs] = useState();
  const [realLength, setRealLength] = useState("-");
  const [successLength, setSuccessLength] = useState("-");
  const [scalesSpent, setScalesSpent] = useState("-");
  const [scalesBurnt, setScalesBurnt] = useState("-");
  const [rwasteUsed, setRwasteUsed] = useState("-");
  const [images, setImages] = useState([]);

  const mutantAbi = [
    "function tokenURI(uint256 tokenId) view returns (string memory)",
  ];
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://eth-mainnet.alchemyapi.io/v2/TKVaMeRCNDf_L-onLkoz2WKEAWIBcCyc",
  });
  const mutantContract = new ethers.Contract(
    "0x83f82414b5065bB9A85E330C67B4A10f798F4eD2",
    mutantAbi,
    provider
  );

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const result = await fetch("https://mutants.0day.love/graphql", {
      headers: {
        accept: "application/json",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer:
        "https://mutants.0day.love/graphiql?query=%7B%0A%20%20get_all_extractions(sort_by%3A%22DESC%22)%7B%0A%20%20%20%20id%0A%20%20%20%20mutantId%0A%20%20%20%20mutantTier%0A%20%20%20%20boostId%0A%20%20%20%20start_date%0A%20%20%20%20tx%0A%20%20%20%20complete_date%0A%20%20%20%20user%0A%20%20%20%20result%0A%20%20%7D%0A%7D",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"query":"{\\n  get_all_extractions(sort_by:\\"DESC\\"){\\n    id\\n    mutantId\\n    mutantTier\\n    boostId\\n    start_date\\n    tx\\n    complete_date\\n    result\\n  user\\n}\\n}","variables":null}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }).then((e) => {
      return e.json();
    });
    let counter1 = 0;
    let counter2 = 0;
    setLogs(result.data.get_all_extractions);
    for (let i = 0; i < result.data.get_all_extractions.length; i++) {
      counter1++;
      if (result.data.get_all_extractions[i].result == 1) {
        counter2++;
      }
    }

    setRealLength(counter1);
    setSuccessLength(counter2);
  }

  async function FetchPhoto(id) {
    const source = document.getElementById("k" + id);
    source.src = loading;
    const metaSrc = await mutantContract.tokenURI(id);
    const metadata = await fetch(metaSrc).then((e) => {
      return e.json();
    });

    source.src = metadata.image;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App mx-auto relative">
        <div className="absolute top-5 right-5 z-10 space-x-5 flex flex-row gamer align-middle">
          <p className="my-auto">Follow KaijuKingz - </p>
          <a href="https://t.co/KW5vsm0pVN" target={"_blank"}>
            <DiscordAlt className="w-8" />
          </a>
          <a href="https://twitter.com/kaijukingz" target={"_blank"}>
            <Twitter className="w-8" />
          </a>
        </div>
        <header className="mx-auto">
          <div className="title px-5 align-middle">
            {/* <img src={logo} className="w-[80px]" alt="logo" /> */}
            <p className="lg:text-6xl text-[3vw] gamer tracking-widest mt-[60px] text-white my-auto py-2 px-4 rounded-sm absolute z-10 lg:top-[160px] top-[9vw] right-0 left-0">
              Kaiju DNA <br />
              <div className="w-1/2 bg-[#ffffff93] h-[2px] mx-auto my-3 rounded-xl uppercase" />{" "}
              Extraction Logs
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
        <div className="brightness-75 lg:max-w-[1300px] mt-[60px] relative">
          <img src={Reactor} />
          <p className="absolute right-2 bottom-2 gamer tracking-wide text-[#ffffff80] lg:text-sm text-[9px]">
            {" "}
            © 2021 KAIJUKINGZ
          </p>
        </div>

        <div className="mt-[70px] pb-[50px]">
          <div className="lg:p-5 p-2">
            <div className="w-full rounded-sm lg:text-4xl retro uppercase flex mb-10 tracking-widest text-[#2C9370] flex-col text-left">
              <p className="z-10 mb-6 gamer uppercase font-bold">Statistics:</p>
              <div className="flex flex-row ml-5 relative">
                <div className="flex-col space-y-3 align-middle">
                  <p className="z-10 lg:text-xl text-sm text-white space-x-3">
                    {" "}
                    <FilePaper className="w-4" />
                    <span>{realLength}</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white space-x-3">
                    <Dna className="w-4" />
                    <span>{successLength}</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white space-x-3">
                    <Money className="w-4" />
                    <span>{realLength > 0 ? realLength * 600 : "-"}</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white space-x-3">
                    <FireAlt className="w-4" />
                    <span>{scalesBurnt}</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white space-x-3">
                    <Nuclear className="w-4" />
                    <span>{rwasteUsed}</span>
                  </p>
                </div>
                <div className="flex-col space-y-3 absolute left-[200px]">
                  <p className="z-10 lg:text-xl text-sm text-white ">
                    <span>Total Attempts</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white ">
                    <span>DNA extracted</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white ">
                    <span>$Scales spent</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white ">
                    <span>$Scales burnt</span>
                  </p>
                  <p className="z-10 lg:text-xl text-sm text-white ">
                    <span>$RWaste used on boosts</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-sm lg:text-4xl gamer flex tracking-widest text-[#2C9370] flex-col">
              <p className="z-10 text-left gamer uppercase font-bold">
                Recent extractions:{" "}
              </p>

              <div className="z-10 lg:px-5 px-1 mt-8 space-y-10 lg:columns-2 flex-col flex">
                {logs ? (
                  logs?.map((e) => {
                    if (e.result !== null) {
                      return (
                        <div className="z-10 font-bold uppercase relative lg:text-[15px] text-[10px] text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-4 rounded-sm space-y-4">
                          <p>
                            TX:{" "}
                            <a href={"https://etherscan.io/tx/" + e.tx}>
                              {e.tx.substring(0, 6)}...
                              {e.tx.substring(60, e.tx.length)}
                            </a>
                          </p>
                          <p>
                            User:{" "}
                            <a href={"https://etherscan.io/address/" + e.user}>
                              {e.user.substring(0, 6)}...
                              {e.user.substring(36, e.tx.length)}
                            </a>
                          </p>
                          <p>Success Chance: 20%</p>
                          <p>
                            Outcome:{" "}
                            {e.result === 1 ? (
                              <span className="text-green-500">SUCCESS</span>
                            ) : (
                              <span className="text-red-500">FAILURE</span>
                            )}
                          </p>
                          <p>
                            Extraction timestamp:{" "}
                            <a
                              href={
                                "https://etherscan.io/block/" + e.complete_date
                              }
                            >
                              {e.complete_date}
                            </a>
                          </p>
                          <div className="relative w-[200px] ">
                            <motion.button
                              className="w-12 h-12 bg-black outline outline-1 rounded-full mb-5 absolute top-2 left-2 cursor-pointer"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Refresh onClick={() => FetchPhoto(e.mutantId)} />
                            </motion.button>

                            <p className="absolute bottom-2 right-2 text-white bg-black text-sm px-2 py-1 rounded-sm outline outline-1">
                              LVL: {e.mutantTier}
                            </p>
                            <img
                              alt={"kaiju id " + e.mutantId}
                              className="outline outline-1 "
                              src={loadingPH}
                              id={"k" + e.mutantId}
                            />
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <p className="gamer text-left text-white animate-bounce">
                    FETCHING LOGS...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-[#000000] fixed bottom-0 max-w-[1300px] lg:text-sm text-xs py-2 z-20 px-3 justify-center gamer tracking-widest">
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
