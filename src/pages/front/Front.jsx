import "../../App.css";
import "../../index.css";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Reactor from "../../Reactor.gif";
import { Dna } from "styled-icons/fa-solid";
import { FilePaper, Twitter } from "styled-icons/remix-fill";
import { motion } from "framer-motion";
import { DiscordAlt } from "styled-icons/boxicons-logos";
import { Money } from "styled-icons/boxicons-regular";
import { Nuclear } from "styled-icons/ionicons-sharp";
import loading from "../../Infinite.gif";
import loadingPH from "../../InfinitePH.png";
import failureImg from "../../failureImg.png";
import { Refresh } from "styled-icons/evil";
import { CancelCircle, Lab } from "styled-icons/icomoon";
import { RightArrowAlt } from "styled-icons/boxicons-solid";

function Front() {
  const [logs, setLogs] = useState();
  const [realLength, setRealLength] = useState("-");
  const [successLength, setSuccessLength] = useState("-");
  const [rwasteUsed, setRwasteUsed] = useState("-");
  const [stolenScales, setStolenScales] = useState("-");
  const [menuVisible, setMenuVisible] = useState(false);
  const [fetchedKaiju, setFetchedKaiju] = useState();

  const mutantAbi = [
    "function tokenURI(uint256 tokenId) view returns (string memory)",
  ];
  const dnaAbi = [
    "function uri(uint256 tokenId) view returns (string memory)",
    "function mutantInfo(uint256) view returns (uint64, uint128, uint16, bool)",
  ];
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://eth-mainnet.alchemyapi.io/v2/TKVaMeRCNDf_L-onLkoz2WKEAWIBcCyc",
  });
  const mutantContract = new ethers.Contract(
    "0x83f82414b5065bB9A85E330C67B4A10f798F4eD2",
    mutantAbi,
    provider
  );
  const dnaContract = new ethers.Contract(
    "0xB0E0698F196E16cd353D409fb19E3536076B7CaE",
    dnaAbi,
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
    let rwaste = 0;
    let stolen = 0;
    setLogs(result.data.get_all_extractions);
    for (let i = 0; i < result.data.get_all_extractions.length; i++) {
      //Incriment the total Extractions done
      counter1++;

      //Incriment successful extractions
      if (result.data.get_all_extractions[i].result == 1) {
        counter2++;
      } else {
        stolen += 600;
      }
      switch (result.data.get_all_extractions[i].boostId) {
        case 0:
          rwaste += 0;
          break;
        case 1:
          rwaste += 200;
          break;
        case 2:
          rwaste += 100;
          break;
        case 3:
          rwaste += 75;
          break;
        case 4:
          rwaste += 500;
          break;
        case 5:
          rwaste += 750;
          break;
      }
    }

    setStolenScales(stolen);
    setRealLength(counter1);
    setSuccessLength(counter2);
    setRwasteUsed(rwaste);
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

  async function FetchMetadata(id) {
    const metaSrc = await mutantContract.tokenURI(id);
    const metadata = await fetch(metaSrc).then((e) => {
      return e.json();
    });
    return metadata;
  }

  async function FetchDNA(tx, id) {
    const source = document.getElementById("d" + id);
    source.src = loading;
    const txInfo = await provider.send("eth_getTransactionReceipt", [tx]);
    const itemId = parseInt(txInfo.logs[0].data.slice(64, 66), 16);
    const metaSrc = await dnaContract.uri(itemId);
    const metadata = await fetch(
      metaSrc.slice(0, metaSrc.length - 4) + itemId
    ).then((e) => {
      return e.json();
    });

    source.src =
      "https://ipfs.io/ipfs/" + metadata.image.slice(7, metadata.image.length);
  }

  async function processSearch() {
    const input = document.getElementById("searchBar");
    const imgSrc = document.getElementById("searchKaiju");
    imgSrc.src = loading;
    if (input.value > 0 && input.value <= 3700 && input.value != "") {
      setMenuVisible(true);
      const meta = await FetchMetadata(input.value);
      const mutantInfo = await dnaContract.mutantInfo(input.value);
      const newObj = {
        id: meta.tokenId,
        ongoing: mutantInfo[3].toString(),
        tier: mutantInfo[2],
      };
      imgSrc.src = meta.image;
      setFetchedKaiju(newObj);
    }
  }

  return (
    <>
      <div className="App mx-auto relative">
        <div className="absolute top-5 right-5 z-10 space-x-5 flex flex-row gamer align-middle">
          <a href="https://t.co/KW5vsm0pVN" target={"_blank"}>
            <DiscordAlt className="w-8 text-white" />
          </a>
          <a href="https://twitter.com/kaijukingz" target={"_blank"}>
            <Twitter className="w-8 text-white" />
          </a>
        </div>
        <div className="absolute top-5 left-5 z-20 space-x-5 flex gamer align-middle ">
          <div className="sm:w-[250px] w-1/2 bg-white rounded-sm h-8 outline outline-1 flex uppercase p-1">
            <input
              className="w-5/6 ml-2 mt-[2px] outline-none text-xl uppercase"
              placeholder="#id"
              id="searchBar"
            />
            <motion.button
              className="bg-black outline outline-1 outline-white text-white w-2/6 rounded-sm text-xs sm:text-lg"
              onClick={() => processSearch()}
            >
              GO
            </motion.button>
            <div className={menuVisible ? "z-20" : "hidden"}>
              <div className="z-20 absolute left-0 top-9 bg-black w-full p-3 flex flex-row space-x-2 outline outline-1 outline-white rounded-sm">
                <CancelCircle
                  className="w-5 absolute top-2 right-2 text-white cursor-pointer z-30"
                  onClick={() => setMenuVisible(false)}
                />
                <img
                  src={loading}
                  className="w-20 z-20 h-20 my-auto outline outline-1 outline-white p-1"
                  alt="kaiju"
                  id="searchKaiju"
                />
                <div className="text-left align-middle my-auto z-20">
                  <p className="text-white"> ID: {fetchedKaiju?.id}</p>
                  <p className="text-white">
                    {" "}
                    Tier:{" "}
                    {fetchedKaiju?.tier === 6
                      ? "S"
                      : String.fromCharCode(102 - fetchedKaiju?.tier)}
                  </p>
                  <p className="text-white">
                    {" "}
                    Extracting: {fetchedKaiju?.ongoing}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header className="mx-auto">
          <div className="title px-5 align-middle">
            <div className="lg:text-6xl text-[3vw] uppercase gamer tracking-widest mt-[60px] text-white my-auto py-2 px-4 rounded-sm absolute z-10 lg:top-[160px] top-[9vw] right-0 left-0">
              Kaiju DNA <br />
              <div className="w-1/2 bg-[#ffffff93] h-[2px] mx-auto my-3 rounded-xl uppercase" />{" "}
              Extraction Logs
            </div>
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
                <div className="flex-col space-y-3 align-middle flex">
                  <div className="z-10 lg:text-xl text-sm text-white space-x-3 flex flex-row">
                    {" "}
                    <FilePaper className="w-4" />
                    <p>{realLength} Total Attempts</p>
                  </div>
                  <div className="z-10 lg:text-xl text-sm text-white space-x-3 flex flex-row">
                    <Dna className="w-4" />
                    <p>{successLength} DNA successfully extracted</p>
                  </div>
                  <div className="z-10 lg:text-xl text-sm text-white space-x-3 flex flex-row">
                    <Money className="w-4" />
                    <p>
                      {realLength > 0 ? realLength * 600 : "-"} $Scales spent
                    </p>
                  </div>
                  <div className="z-10 lg:text-xl text-sm text-white space-x-3  flex flex-row">
                    <Lab className="w-4 my-auto" />
                    <p>{stolenScales} $Scales sent to scientists</p>
                  </div>
                  <div className="z-10 lg:text-xl text-sm text-white space-x-3 flex flex-row">
                    <Nuclear className="w-4" />
                    <p>{rwasteUsed} $RWaste used on boosts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-sm lg:text-4xl gamer flex tracking-widest text-[#2C9370] flex-col">
              <p className="z-10 text-left gamer uppercase font-bold mt-10">
                Recent extractions:{" "}
              </p>

              <div className="grid grid-flow-row lg:grid-cols-2 lg:p-4 p-1">
                {logs ? (
                  logs?.map((e) => {
                    return (
                      <div className="lg:m-3 m-2 z-10 retro font-bold inline-grid uppercase lg:text-[15px] text-[10px] text-white text-left bg-[#00000093] outline outline-1 outline-gray-500 p-4 rounded-sm space-y-4">
                        <p>
                          TX: <br />
                          <a
                            href={"https://etherscan.io/tx/" + e.tx}
                            target={"_blank"}
                          >
                            {e.tx.substring(0, 10)}...
                            {e.tx.substring(56, e.tx.length)}
                          </a>
                        </p>
                        <p>
                          User: <br />
                          <a
                            href={"https://etherscan.io/address/" + e.user}
                            target={"_blank"}
                          >
                            {e.user.substring(0, 10)}...
                            {e.user.substring(32, e.tx.length)}
                          </a>
                        </p>
                        <p>Success Chance: %{e.mutantTier * 10 + 20}</p>
                        <p>
                          Outcome:{" "}
                          {e.result === 1 ? (
                            <span className="text-green-500">SUCCESS</span>
                          ) : (
                            <span className="text-red-500">FAILURE</span>
                          )}
                        </p>
                        <p>Extraction time: {Date(e.complete_date)}</p>
                        <p>
                          Boost:{" "}
                          {e.boostId == 0
                            ? "Default"
                            : e.boostId == 1
                            ? "Basic"
                            : e.boostId == 2
                            ? "No Commons"
                            : e.boostId == 3
                            ? "Coin Flip"
                            : e.boostId == 4
                            ? "Flattened"
                            : e.boostId == 4
                            ? "Always Epic"
                            : ""}
                        </p>
                        <div className="flex">
                          <div className="relative md:w-[200px] md:h-[200px] w-[110px] h-[130px] mx-auto">
                            <motion.button
                              className="w-[8vw] h-[8vw] lg:w-1/4 lg:h-1/4 bg-black outline outline-1 rounded-full absolute top-2 left-2 cursor-pointer"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Refresh
                                onClick={() => FetchPhoto(e.mutantId)}
                                className="outline-none"
                              />
                            </motion.button>

                            <p className="absolute bottom-2 right-2 text-white bg-black text-xs px-2 py-1 rounded-sm outline outline-1">
                              TIER:{" "}
                              {e.mutantTier === 6
                                ? "S"
                                : String.fromCharCode(102 - e.mutantTier)}
                            </p>
                            <img
                              alt={"kaiju id " + e.mutantId}
                              className="outline outline-1 "
                              src={loadingPH}
                              id={"k" + e.mutantId}
                            />
                          </div>
                          <RightArrowAlt className="md:w-[100px] w-[70px] mx-auto" />
                          {e.result == 1 ? (
                            <div className="relative md:w-[200px] md:h-[200px] w-[110px] h-[110px] mx-auto outline-none">
                              <motion.button
                                className="w-[8vw] h-[8vw] lg:w-1/4 lg:h-1/4 bg-black outline outline-1 rounded-full absolute top-2 left-2 cursor-pointer outline-none"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Refresh
                                  className="outline-none"
                                  onClick={() => FetchDNA(e.tx, e.mutantId)}
                                />
                              </motion.button>
                              <img
                                alt={"kaiju dna " + e.mutantId}
                                className="outline outline-1 "
                                src={loadingPH}
                                id={"d" + e.mutantId}
                              />
                            </div>
                          ) : (
                            <div className="relative md:w-[200px] md:h-[200px] w-[110px] h-[110px]  mx-auto">
                              <img
                                alt={"kaiju dna " + e.mutantId}
                                src={failureImg}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
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
        <footer className="bg-[#000000] fixed bottom-0 max-w-[1300px] lg:text-sm text-[10px] py-2 z-20 px-3 justify-center gamer tracking-widest text-white">
          This website is not affiliated with Augminted Labs, it's a fan-made
          tool created by -
          <span className="italic">
            <a
              href="https://twitter.com/haruxeETH"
              target={"_blank"}
              className="text-green-600"
            >
              Haruxe
            </a>
          </span>
          - and -
          <span className="italic">
            <a
              href="https://twitter.com/erc1337_Coffee"
              target={"_blank"}
              className="text-green-600"
            >
              Coffee & Weed{" "}
            </a>
          </span>
          - for the KaijuKingz community.
        </footer>
      </div>
    </>
  );
}

export default Front;
