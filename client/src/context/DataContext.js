import React, { useEffect, useState, createContext } from "react";
import Web3 from "web3";
import MainContract from "contracts/MainContract.json";
import addressFile from "address/address.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  /***************************************************************/
  /************************* VARIABILI ***************************/
  /***************************************************************/
  const [currentAccount, setCurrentAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState({
    username: "",
    userLevel: 1,
    userVictories: 0,
    userLosses: 0,
  });
  const [userActiveMonster, setUserActiveMonster] = useState({
    id: "",
    name: "",
    level: 1,
    type: "",
    url: "",
  });
  const [randomMonsterToCatch, setRandomMonsterToCatch] = useState({
    name: "",
    type: "",
    id: "",
    healthPoints: "",
    url: "",
  });
  const [starters, setStarters] = useState([]);
  const [userHasMonsters, setUserHasMonsters] = useState(false);
  const [findableMonster, setFindableMonster] = useState([]);
  const [userMonsters, setUserMonsters] = useState([]);
  const [monstersOnSale, setMonstersOnSale] = useState([]);
  const [moveToBuy, setMoveTobuy] = useState([]);
  const [selectedMonsteMoves, setSelectedMonsteMoves] = useState([]);
  const [amount, setAmount] = useState("");
  const [randomUserToFight, setRandomUserToFight] = useState({
    username: "",
    userLevel: "",
    activeMonster: "",
    userVictories: "",
    userLosses: "",
    userAddress: "",
  });
  const [opponentUserData, setOpponentUserData] = useState({
    monsterName: "",
    monsterType: "",
    monsterLevel: "",
    monsterHealthPoints: "",
    monsterUrlImg: "",
  });
  const [activeMonsterMoves, setActiveMonsterMoves] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false); // Tool
  const [openSuccessUpgrade, setOpenSuccessUpgrade] = useState(false); // Level Up
  const [openSuccessAddMove, setOpenSuccessAddMove] = useState(false);  // Owern - add new move
  const [openSuccessSellMonster, setOpenSuccessSellMonster] = useState(false);
  const [openSuccessSetActiveMonster, setOpenSuccessSetActiveMonster] = useState(false);
  const [maticBalance, setMaticBalance] = useState(0);
  const [userTools, setUserTools] = useState({
    normal: 0,
    mega: 0,
    ultra: 0,
  });
  const [loadingMonsterSelection, setLoadingMonsterSelection] = useState(false);
  const [loadingUserCreation, setLoadingUserCreation] = useState(false);
  const [loadingCatch, setLoadingCatch] = useState(false);
  const [loadingFight, setLoadingFight] = useState(false);
  const [loadSnippingTool, setLoadSnippingTool] = useState(false);
  const [loadingSellMonster, setLoadingSellMonster] = useState(false);
  const [loadingSetActiveMonster, setLoadingSetActiveMonster] = useState(false);
  const [loadingAddNewMove, setLoadingAddNewMove] = useState(false);
  const [loadingAddNewMonster, setLoadingAddNewMonster] = useState(false);
  const [loadingWhitdraw, setLoadingWhitdraw] = useState(false);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [disableCatchButton, setDisableCatchButton] = useState(false);
  const [openWin, setOpenWin] = useState(false);
  const [openLose, setOpenLose] = useState(false);
  const [openWinCatch, setOpenWinCatch] = useState(false);
  const [openLoseCatch, setOpenLoseCatch] = useState(false);
  const [createMonsterSuccess, setCreateMonsterSuccess] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [monsterAlreadyOnSell, setMonsterAlreadyOnSell] = useState(false);
  const [openBuyMove, setOpenBuyMove] = useState(false);
  const [allStarters, setAllStarters] = useState([]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const { ethereum } = window;

  let mainContract;
  let isInitialized = false;

  /***************************************************************/
  /************************** HOME PAGE **************************/
  /***************************************************************/

  // Call function to connect the Wallet
  const connectWallet = async () => {
    let provider = window.ethereum;
    const web3 = new Web3(provider);

    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log("Herer", accounts);
          setCurrentAccount(accounts[0]);

          web3.eth
            .getBalance(accounts[0])
            .then((res) =>
              setMaticBalance(web3.utils.fromWei(res, "ether").substring(0, 5))
            );
        })
        .catch((err) => {
          console.log(err);
        });

      window.ethereum.on("accountsChanged", function (accounts) {
        setCurrentAccount(accounts[0]);
      });
    }

    mainContract = new web3.eth.Contract(MainContract.abi, addressFile.address);
    isInitialized = true;
  };

  // Call function to check if the user is the owner of selected monster
  const checkIsOwner = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .isOwner()
      .call({ from: currentAccount })
      .then((res) => {
        setIsOwner(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Call function to check if already exist an account associeted to current addess/wallet
  const checkExistingAccount = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .existAccount()
      .call({ from: currentAccount })
      .then((res) => {
        if (res) getUser();
      })
      .catch((err) => console.log(err));
  };

  // Call function to create a new user
  const createUser = async (input) => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .createUser(input)
      .send({ from: currentAccount })
      .then((res) => {
        if (res) {
          setUser({ username: input });
          setLoadingUserCreation(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingUserCreation(false);
      });
  };

  // Call function to check if user have at least one monster
  // If user have zero monsters, then call function to take listo of "Startes"
  // and load the page to select the firts monster
  const userHasMonstersCheck = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .checkUserHaveMonsters()
      .call({ from: currentAccount })
      .then((res) => {
        setUserHasMonsters(res);
        if (!res) {
          mainContract.methods
            .getStarters()
            .call({ from: currentAccount })
            .then((result) => {
              setStarters(result);
            })
            .catch((getStartersError) => console.log(getStartersError));
        } else {
          getDataOfActiveMonster();
        }
      })
      .catch((checkUserMonstersError) => console.log(checkUserMonstersError));
  };

  // call function to select the first monster
  const selectMonster = async (starterInput) => {
    if (!isInitialized) {
      await connectWallet();
    }
    console.log(starterInput);
    mainContract.methods
      .selectFirstMonster(starterInput.id)
      .send({ from: currentAccount })
      .then((res) => {
        if (res) {
          setUserActiveMonster({
            id: starterInput.id,
            name: starterInput.name,
            level: 1,
            type: starterInput.typeOfMonster,
            url: starterInput.urlImg,
          });
          setLoadingMonsterSelection(false);
          setUserHasMonsters(true);
          console.log("Mostro scelto con successo");
        } else {
          console.log("Si e' verificato un errore");
          setLoadingMonsterSelection(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingMonsterSelection(false);
      });
  };

  // Call function to get the user data
  const getUser = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getUserData()
      .call({ from: currentAccount })
      .then((res) => {
        console.log("Res getUser", res);
        setUser({
          username: res.name,
          userLevel: res.level,
          userVictories: parseInt(res.victories, 16),
          userLosses: parseInt(res.losses, 16),
        });
        getUserMonsters();
        getUserTools();
      })
      .catch((err) => console.log(err));
  };

  // Function to convert the type code to type name
  const getType = (type) => {
    switch (type) {
      case "0":
        return "fire";
      case "1":
        return "water";
      case "2":
        return "leaf";
      default:
        return;
    }
  };

  // Function to make short the addess 
  const easyAddress = (address) => {
    return `${address.substring(0, 5)}...${address.substring(
      address.length - 4,
      address.length
    )}`;
  };

  /***************************************************************/
  /************************** PROFILE ****************************/
  /***************************************************************/

  // Call function to get all user monsters
  const getUserMonsters = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getUserMonsters()
      .call({ from: currentAccount })
      .then((res) => {
        setUserMonsters(res);
      })
      .catch((err) => console.log(err));
  };

  // Call function to get data of active monster
  const getDataOfActiveMonster = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getActiveMonster()
      .call({ from: currentAccount })
      .then((res) => {
        setUserActiveMonster({
          id: res.id,
          name: res.name,
          level: res.level,
          type: res.typeOfMonster,
          url: res.urlImg,
        });
      })
      .catch((err) => console.log(err));
  };

  // Call function to get number of tools possessed by user
  const getUserTools = async () => {
    if (!isInitialized) {
      await connectWallet();
    }

    mainContract.methods
      .getNumberOfCapureToolOfUser()
      .call({ from: currentAccount })
      .then((res) => {
        setUserTools({
          normal: parseInt(res[0], 16),
          mega: parseInt(res[1], 16),
          ultra: parseInt(res[2], 16),
        });
      })
      .catch((err) => console.log(err));
  };

  // Call function to change the active monster
  const callSetActiveMonster = async (monsterID) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingSetActiveMonster(true)
    mainContract.methods
      .checkMonsterIsOnSell(monsterID)
      .call({ from: currentAccount })
      .then((res) => {
        if (!res) {
          mainContract.methods
            .setActiveMonster(monsterID)
            .send({ from: currentAccount })
            .then((res) => {
              console.log(res);
              if (res) console.log("Cambiato mostro attivo con successo");
              setLoadingSetActiveMonster(false);
              setOpenSuccessSetActiveMonster(true);
            })
            .catch((err) => {
              console.log("Si è verificato un errore");
              setLoadingSetActiveMonster(false);
          });
        } else {
          console.log("I mostri in vendita non possono essere impostati come mostri attivi");
          setLoadingSetActiveMonster(false)
        }
      })
      .catch((err) => {
        console.log("Si è verificato un errore");
        setLoadingSetActiveMonster(false);
      });
  };

  // Call function to get all moves of selected monster
  const getSelectedMonsterMoves = async (monsterId) => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getMovesOfMonster(monsterId)
      .call({ from: currentAccount })
      .then((res) => {
        if (res) {
          setSelectedMonsteMoves(res);
        } else {
          console.log("Si è verificato un errore");
        }
      })
      .catch((err) => console.log(err));
  };

  /***************************************************************/
  /************************** SHOP *******************************/
  /***************************************************************/

  // Call function to buy normal tool
  const buyNormalTool = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadSnippingTool(true)
    mainContract.methods
      .buyCaptureTool(0)
      .send({ from: currentAccount, value: 0.005 * 10 ** 18 })
      .then((res) => {
        if (res) {
          setOpenSuccess(true);
          getUserTools();
          console.log("Acqistato normal tool");
        } else console.log("Errore nell'acquisto");

        setLoadSnippingTool(false)
      })
      .catch((err) =>{
        console.log(err)
        setLoadSnippingTool(false)
      });
  };

  // Call function to buy mega tool
  const buyMegaTool = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadSnippingTool(true)
    mainContract.methods
      .buyCaptureTool(1)
      .send({ from: currentAccount, value: 0.006 * 10 ** 18 })
      .then((res) => {
        if (res) {
          setOpenSuccess(true);
          getUserTools();
          console.log("Acqistato Mega tool");
        } else console.log("Errore nell'acquisto");
        setLoadSnippingTool(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadSnippingTool(false)
      });
  };

  // Call function to buy ultra tool
  const buyUltraTool = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadSnippingTool(true)
    mainContract.methods
      .buyCaptureTool(2)
      .send({ from: currentAccount, value: 0.007 * 10 ** 18 })
      .then((res) => {
        if (res) {
          setOpenSuccess(true);
          getUserTools();
          console.log("Acqistato Ultra tool");
        } else console.log("Errore nell'acquisto");
        setLoadSnippingTool(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadSnippingTool(false)
      });
  };

  // Call function to sell monster
  const sellMonster = async (monsterId, price) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingSellMonster(true)
    console.log("monstersID", monsterId);
    console.log(price);
    mainContract.methods
      .checkMonsterIsOnSell(monsterId)
      .call({ from: currentAccount })
      .then((res) => {
        if (!res) {
          mainContract.methods
            .sellUserMonster(monsterId, price)
            .send({ from: currentAccount })
            .then((res) => {
              setLoadingSellMonster(false)
              if (res) {
                console.log(res, "Mostro messo in vendita con successo");
                setOpenSuccessSellMonster(true);
              } else console.log("Si e' verificato un errore");
            })
            .catch((err) =>{
              console.log("Non puoi mettere in vendita il mostro attivo")
              setLoadingSellMonster(false)
            });
        } else {
          console.log("Il mostro è già stato messo in vendita");
          setMonsterAlreadyOnSell(true)
        }})
      .catch((err) =>{
        console.log("Non puoi mettere in vendita il mostro attivo")
        setLoadingSellMonster(false)
      });
  };

  // Call function to get the list of monsters on sell
  const getMonstersOnSale = async () => {
    if (!isInitialized) {
      await connectWallet();
    }

    mainContract.methods
      .getAllMonstersOnSell()
      .call({ from: currentAccount })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          mainContract.methods
            .getMonsterByID(res[i].idMonster)
            .call({ from: currentAccount })
            .then((resData) => {
              setMonstersOnSale((prevState) => [
                ...prevState,
                {
                  id: resData.id,
                  price: res[i].price,
                  name: resData.name,
                  type: resData.typeOfMonster,
                  level: resData.level,
                  healthPoints: resData.healthPoints,
                  url: resData.urlImg,
                  owner: res[i].owner,
                },
              ]);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  // Call function to buy a monster on sell
  const buyMonster = async (monsterID, price, owner) => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .buyMonster(monsterID)
      .send({ from: currentAccount })
      .then((res) => {
        if (res) console.log(res, "Mostro acquistato con successo");
        else console.log("Si è verificato un errore");
      })
      .catch((err) => console.log(err));

    console.log(monsterID);
    console.log(price);
    console.log(owner);
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: owner,
          value: price,
        },
      ],
    });
  };

  // Call function to buy the levelUp of monster
  const buyLevelUp = async (monsterID) => {
    if (!isInitialized) {
      await connectWallet();
    }
    console.log(monsterID);
    setLoadingUpgrade(true);
    mainContract.methods
      .levelUp(monsterID)
      .send({ from: currentAccount, value: 0.05 * 10 ** 18 })
      .then((res) => {
        setLoadingUpgrade(false);
        if (res) {
          console.log("Level Up avvenuto con successo");
          setOpenSuccessUpgrade(true);
          console.log(res);
        } else {
          console.log("Si è verificato un errore");
        }
      })
      .catch((err) => {
        setLoadingUpgrade(false);
        console.log("Si è verificato un errore", err)
      });
  };

  // Call function to get the list of buyable moves
  // [it's also used in OWNER section]
  const getMoveToBuy = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getMoveToBuy()
      .call({ from: currentAccount })
      .then((res) => {
        if (res) {
          setMoveTobuy(res);
        }
      })
      .catch((err) => console.log(err));
  };

  // Call function to buy move
  const callBuyMove = async (
    monsterId,
    moveName,
    moveDamage,
    moveType,
    movePrice
  ) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingUpgrade(true);
    mainContract.methods
      .buyMove(monsterId, moveName, moveDamage, moveType)
      .send({ from: currentAccount, value: (movePrice / 100) * 10 ** 18 })
      .then((res) => {
        setLoadingUpgrade(false);
        if (res) {
          console.log("Acquistato mossa");
          setOpenBuyMove(true);
        } else {
          console.log("Si è verificato un errore");
        }
        
      })
      .catch((err) => {
        console.log(err);
        setLoadingUpgrade(false);
      });
  };

  /***************************************************************/
  /************************** OWNER ******************************/
  /***************************************************************/
  // Function to add new findable monster 
  const createMonster = async (
    name,
    typeOfMonster,
    healthPoints,
    url,
    moveName,
    moveDamage,
    moveType
  ) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingAddNewMonster(true);
    mainContract.methods
      .createDefaultMonster(
        name,
        typeOfMonster,
        healthPoints,
        url,
        moveName,
        moveDamage,
        moveType
      )
      .send({ from: currentAccount })
      .then((res) => {
        setCreateMonsterSuccess(true)
        console.log("Mostro creato");
        setLoadingAddNewMonster(false);
      })
      .catch((err) =>{
        setLoadingAddNewMonster(false);
        console.log(err);
      });
  };

  // Call function to get list of findable monsters
  const getFindableMonster = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getFindableMonster()
      .call({ from: currentAccount })
      .then((res) => {
        setFindableMonster(res);
      })
      .catch((err) => console.log(err));
  };

  // Call function to get amount of matic are inside the contract
  const getAmountByOwner = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getAmount()
      .call({ from: currentAccount })
      .then((res) => {
        if (res) {
          setAmount(res / 10 ** 18);
        } else {
          console.log("Si è verificato un errore");
        }
      })
      .catch((err) => console.log(err));
  };

  // Call function to whitdraw matic from contract to owner wallet
  const whitdrawAmountByOwner = async (amount) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingWhitdraw(true);
    amount = amount * (10 ** 18);
    mainContract.methods
      .withdraw(amount)
      .send({ from: currentAccount })
      .then((res) => {
        if (res) {
          console.log("trasferimento avvenut con successo");
          setWithdrawSuccess(true);
        } else {
          console.log("Si è verificato un errore");
        }
        setLoadingWhitdraw(false);
      })
      .catch((err) => {
        setLoadingWhitdraw(false);
        console.log(err);
      });   
  };

  // Call function to add new buyable move
  const addMove = async (moveName, moveDamage, moveType, movePrice) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingAddNewMove(true);
    mainContract.methods
      .addNewMoveByOwner(moveName, moveDamage, moveType, movePrice)
      .send({ from: currentAccount })
      .then((res) => {
        if (res) {
          setOpenSuccessAddMove(true);
        } else {
          console.log("Si è verificato un errore");
        }
        setLoadingAddNewMove(false)
      })
      .catch((err) => {
        setLoadingAddNewMove(false);
        console.log(err)});
  };

  // Call function to get le list of starters
  const getAllStartes = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getStarters()
      .call({ from: currentAccount })
      .then((res) => {
        setAllStarters(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  /***************************************************************/
  /************************** PLAY *******************************/
  /***************************************************************/

  // Call function to find a random monster to catch
  const getRandomMonsterToCatch = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingCatch(true);
    setDisableCatchButton(true);

    mainContract.methods
      .getRandomNumber()
      .send({ from: currentAccount })
      .then((res) => console.log("Richiesta numero Random inviata"))
      .catch((err) => {
        console.log(err);
        setLoadingCatch(false);
        setDisableCatchButton(false);
      });

    await delay(10000);

    var numeroRandom = 0;
    do {
      mainContract.methods
        .getNum()
        .call({ from: currentAccount })
        .then((res) => {
          numeroRandom = res;
          console.log(numeroRandom);
        })
        .catch((err) => {
          console.log(err);
          setLoadingCatch(false);
          setDisableCatchButton(false);
        });
      await delay(5000);
    } while (numeroRandom == 0);
    console.log(numeroRandom);

    mainContract.methods
      .getRandomMonster()
      .call({ from: currentAccount })
      .then((monsterID) => {
        mainContract.methods
          .getDefaultMonsterByID(monsterID)
          .call({ from: currentAccount })
          .then((monsterData) => {
            setRandomMonsterToCatch({
              name: monsterData.name,
              type: monsterData.typeOfMonster,
              id: monsterData.id,
              healthPoints: monsterData.healthPoints,
              url: monsterData.urlImg,
            });

            getUserTools();
            setLoadingCatch(false);
            setDisableCatchButton(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingCatch(false);
            setDisableCatchButton(false);
          });
      })

      .catch((err) => {
        console.log(err);
        setLoadingCatch(false);
        setDisableCatchButton(false);
      });

  };

  // Call function to try to catch a monster
  const tryToCatch = async (typeOfTool) => {
    if (!isInitialized) {
      await connectWallet();
    }

    setLoadingCatch(true);
    setDisableCatchButton(true);

    mainContract.methods
      .getRandomNumber()
      .send({ from: currentAccount })
      .then((res) => console.log("Richiesta numero Random inviata"))
      .catch((err) => {
        console.log(err);
        setLoadingCatch(false);
        setDisableCatchButton(false);
      });

    await delay(10000);
    var numeroRandom = 0;
    do {
      mainContract.methods
        .getNum()
        .call({ from: currentAccount })
        .then((res) => {
          numeroRandom = res;
          console.log(numeroRandom);
        })
        .catch((err) => {
          console.log(err);
          setLoadingCatch(false);
          setDisableCatchButton(false);
        });
      await delay(5000);
    } while (numeroRandom == 0);
    console.log(numeroRandom);

    mainContract.methods
      .captureMonster(typeOfTool, randomMonsterToCatch.id)
      .send({ from: currentAccount })
      .then((res) => {
        console.log(res)
        if (res.events.CaptureResult.returnValues._value) {
          setOpenWinCatch(true);
        } else {
          setOpenLoseCatch(true);
          setDisableCatchButton(false);
        }
        getUserTools();
        setLoadingCatch(false);
        //setDisableCatchButton(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCatch(false);
        setDisableCatchButton(false);
      });
  };

  // Call function to get random user to fight
  const getRandomUserToFight = async (amount) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingFight(true)

    mainContract.methods
      .getRandomNumber()
      .send({ from: currentAccount })
      .then((res) => console.log("Richiesta numero Random inviata"))
      .catch((err) => {
        console.log(err)
        setLoadingFight(false)
      });

    // soluzione temporaneo
    await delay(10000);

    var numeroRandom = 0;
    do {
      mainContract.methods
        .getNum()
        .call({ from: currentAccount })
        .then((res) => {
          numeroRandom = res;
          console.log(numeroRandom);
        })
        .catch((err) => {
          console.log(err)
          setLoadingFight(false)
        });
      await delay(5000);
    } while (numeroRandom === 0);
    console.log(numeroRandom);

    mainContract.methods
      .getRandomUser()
      .call({ from: currentAccount })
      .then((res) => {
        if (
          res.valueOf().toLowerCase() === currentAccount.valueOf().toLowerCase()
        ) {
          alert("non ci sono altri giocatori sulla piattaforma");
        } else {
          console.log(res);
          mainContract.methods
            .getUserByAddress(res)
            .call({ from: currentAccount })
            .then((resUserData) => {
              setRandomUserToFight({
                username: resUserData.name,
                userLevel: resUserData.level,
                activeMonster: resUserData.activeMonster,
                userVictories: resUserData.victories,
                userLosses: resUserData.losses,
                userAddress: resUserData.userAddress,
              });
              mainContract.methods
                .getActiveMonsterOfUser(resUserData.userAddress)
                .call({ from: currentAccount })
                .then((resMonsterData) => {
                  setOpponentUserData({
                    monsterName: resMonsterData.name,
                    monsterType: resMonsterData.typeOfMonster,
                    monsterLevel: resMonsterData.level,
                    monsterHealthPoints: resMonsterData.healthPoints,
                    monsterUrlImg: resMonsterData.urlImg,
                  });
                  console.log(resMonsterData.urlImg);
                  setLoadingFight(false)
                })
                .catch((err) => {
                  setLoadingFight(false)
                  console.log(err)
                });
            })
            .catch((err) => {
              setLoadingFight(false)
              console.log(err)
            });
        }
        setLoadingFight(false)
      })
      .catch((err) => {
        setLoadingFight(false)
        console.log(err)
      });
  };

  // Call function to get moves of active monster 
  const getActiveMonsterMoves = async () => {
    if (!isInitialized) {
      await connectWallet();
    }
    mainContract.methods
      .getMovesOfActiveMonster()
      .call({ from: currentAccount })
      .then((res) => {
        if (res) {
          setActiveMonsterMoves(res);
          console.log(res);
        } else {
          console.log("Si è verificato un errore");
        }
      })
      .catch((err) => console.log(err));
  };

  // Call function to start the fight and get the result
  const startFight = async (opponentAddress, userMoveIndex) => {
    if (!isInitialized) {
      await connectWallet();
    }
    setLoadingFight(true)

    await mainContract.methods
      .defineWinner(opponentAddress, userMoveIndex)
      .send({ from: currentAccount })
      .then((res) => {
        if(res.events.FigthResult.returnValues._value) {
          setOpenWin(true)
          console.log("User Win")
        } else{
          setOpenLose(true)
          console.log("User Lose")
        }
        setLoadingFight(false)
      })
      .catch((err) => {
        setLoadingFight(false)
        console.log(err)
      });
  };

  useEffect(() => {
    connectWallet();
    getMonstersOnSale();
    getMoveToBuy();
    setRandomUserToFight("");
    getAllStartes();
    getFindableMonster();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkIsOwner();
    checkExistingAccount();
    userHasMonstersCheck();
    // eslint-disable-next-line
  }, [currentAccount]);

  return (
    <DataContext.Provider
      value={{
        currentAccount,
        user,
        isOwner,
        userHasMonsters,
        userActiveMonster,
        starters,
        findableMonster,
        userMonsters,
        connectWallet,
        createUser,
        selectMonster,
        getUserTools,
        buyNormalTool,
        buyMegaTool,
        buyUltraTool,
        createMonster,
        getFindableMonster,
        sellMonster,
        getRandomMonsterToCatch,
        randomMonsterToCatch,
        userTools,
        tryToCatch,
        getMonstersOnSale,
        //callGetMonsterByID,
        monstersOnSale,
        callSetActiveMonster,
        buyLevelUp,
        moveToBuy,
        callBuyMove,
        getSelectedMonsterMoves,
        selectedMonsteMoves,
        getAmountByOwner,
        amount,
        whitdrawAmountByOwner,
        buyMonster,
        getRandomUserToFight,
        randomUserToFight,
        opponentUserData,
        openSuccess,
        setOpenSuccess,
        getActiveMonsterMoves,
        activeMonsterMoves,
        getType,
        maticBalance,
        easyAddress,
        addMove,
        openSuccessAddMove,
        setOpenSuccessAddMove,
        loadingMonsterSelection,
        setLoadingMonsterSelection,
        loadingUserCreation,
        setLoadingUserCreation,
        loadingCatch,
        disableCatchButton,
        loadingFight,
        openSuccessUpgrade,
        setOpenSuccessUpgrade,
        openSuccessSellMonster,
        setOpenSuccessSellMonster,
        startFight,
        openWin,
        setOpenWin,
        openLose, 
        setOpenLose,
        openWinCatch,
        setOpenWinCatch,
        openLoseCatch,
        setOpenLoseCatch,
        createMonsterSuccess,
        setCreateMonsterSuccess,
        withdrawSuccess,
        setWithdrawSuccess,
        monsterAlreadyOnSell,
        setMonsterAlreadyOnSell,
        loadSnippingTool,
        setLoadSnippingTool,
        loadingSellMonster,
        loadingSetActiveMonster,
        openSuccessSetActiveMonster,
        setOpenSuccessSetActiveMonster,
        findableMonster,
        allStarters,
        loadingAddNewMove,
        loadingAddNewMonster,
        loadingWhitdraw,
        loadingUpgrade,
        openBuyMove,
        setOpenBuyMove,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
