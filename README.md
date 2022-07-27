### Blockchain Game

# Polygon Blockchain

In order to launch the game, follow these instructions. Please feel free to reach out if any help is needed.

First of all install all the dependencies from the root directory:

```bash
npm install
```

Launch Ganache and import an account on Metamask

On Metamask, add the Polygon TestNet with the following data:

1. Network Name: Polygon Mumbai Testnet
2. New RPC URL: https://polygon-mumbai.g.alchemy.com/v2/your-api-key
3. ChainID: 80001
4. Symbol: MATIC
5. Block Explorer URL: https://mumbai.polygonscan.com/

Choose this new network from the account you just added through Ganache and add some MATIC.
from this link: [FAUCET MATIC] (https://faucet.polygon.technology/)
Select:

- Network: Mumbai
- Token: MATIC
- Wallet Address: The one of the account you just added through Ganache.

Wait until 0.5/1 Matic are added to your wallet.

At this moment, add LINKs from the following website: [FAUCET LINK] (https://faucets.chain.link/)
Choose:

- Network: Polygon Mumbai
- TestNet Account address:  The one of the account you just added through Ganache.

Wait until ~20 LINK are added to your wallet.

You should have at this point on Metamask the account you added from Ganache on the Polygon Mumbai Testnet with ~1 Matic and ~20 LINK.

Now add a file named ".env" to the root directory.
Inside of it there will be:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/ueixxxxxxxxxxxxxxxxxxxxi7_Q"
PRIVATE_KEY = "0xff50d56ac8d9xxxxxxxxxxxxxxxxxxxxxxxec40c514fcce6b"
```

Instead of the PRIVATE_KEY insert the private key provided by Ganache for that address.
API_URL is the URL of the DAPP created on Alchemy.
[Alchemy] (https://dashboard.alchemyapi.io/).

Compile the contracts with HardHat [Hardhat] (https://hardhat.org/).
From the root directory:

```bash
npx hardhat compile
```
It should create a folder "artifacts" that corresponds to the "build" folder if you are using Truffle instead of HardHat.

Once done this, give the following command from the root directory to deploy contracts on the Polygon TestNet:

```bash
npx hardhat run deploy.js --network polygon_mumbai
```

The console should answer with something along the lines of:

```bash
Contract deployed to address: 0x29A2505a6bD892B0604789c456a073bcE4Ea7fb0
```

This address will automatically be inserted on the client side of the app at the file DataContext.js

```javascript
mainContract = new web3.eth.Contract(
  MainContract.abi,
  "0x29A2505a6bD892B0604789c456a073bcE4Ea7fb0"
);
```

After this you can launch the client with 

```bash
npm run start
```
If everything has gone well you can visit the site on PolyScan [Polyscan] (https://mumbai.polygonscan.com/),
copy the address of the contract and visualize all the transacions to and from the blockchain and debug from here.
The first transactions must be "Contract Creation".

For the game to work correctly, you must be able to use the Random function, and to do so you must send LINK tokens to the contract address.l
From Metamask, select LINK -> Send and send it to the contract address. 

Documentation
[Polygon] (https://docs.polygon.technology/docs/develop/alchemy)

Authors:

Jason Shuyinta
Keran Jegasothy
Qazim Mucodema
