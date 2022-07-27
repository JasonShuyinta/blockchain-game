# Polygon Blockchain

Per prima cosa installare tutte le dipendenza dalla root directory:

```bash
npm install
```

Lancia Ganache e importa un account su Metamask

Su Metamask, aggiungere la TestNet polygon con i seguenti dati:

1. Network Name: Polygon Mumbai Testnet
2. New RPC URL: https://polygon-mumbai.g.alchemy.com/v2/your-api-key
3. ChainID: 80001
4. Symbol: MATIC
5. Block Explorer URL: https://mumbai.polygonscan.com/

Scegli questo nuovo network all'account che hai aggiunto tramite ganache e aggiungi dei MATIC test
da questo link: [FAUCET MATIC] (https://faucet.polygon.technology/)
Scegli:

- Network: Mumbai
- Token: MATIC
- Wallet Address: Quello dell'account appena aggiunto tramite ganache

Attendi che vengano aggiunti 0.5 oppure 1 MATIC.

A questo punto aggiungi i LINK da sito : [FAUCET LINK] (https://faucets.chain.link/)
Scegli:

- Network: Polygon Mumbai
- TestNet Account address: Quello dell'account appena aggiunto tramite ganache

Attendi che vengano aggiunti 20 LINK circa.

Dovresti avere a questo punto su Metamask, l'address aggiunto da ganache su network Polygon Mumbai Testnet con circa 1 MATIC e circa 20 LINK.

A questo punto aggiungi un file chiamato ".env" nella root directory.
Al suo interno avra':

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/ueiDC0MI9PcxtoS225GicDCFhFN3i7_Q"
PRIVATE_KEY = "0xff50d56ac8d990c454eaee263c4dc3a34339e4be03204d23ecec40c514fcce6b"
```

Al posto della Private Key metti la private key fornita da Ganache per quell'address.
API_URL dovrebbe andare bene cosi (Sarebbe l'url della DAPP creata su Alchemy, dovrebbe andare bene per entrambi, senza bisogno che facciamo un account per ogni owner).
[Alchemy] (https://dashboard.alchemyapi.io/).

Compila i contratti tramite [Hardhat] (https://hardhat.org/) e non piu' truffle.
sempre da root directory:

```bash
npx hardhat compile
```

Dovrebbe crearti una cartella "artifacts" che corrisponde a quella "build" di truffle.

Una volta fatto questo dai questo comando sempre da root directory per deployare i contratti sulla Polygon Testnet:

```bash
npx hardhat run deploy.js --network polygon_mumbai
```

La console dovrebbe rispondere con qualcosa tipo

```bash
Contract deployed to address: 0x29A2505a6bD892B0604789c456a073bcE4Ea7fb0
```

Copia questo address e incollalo nel file DataContext.js a riga 57 circa:

```javascript
mainContract = new web3.eth.Contract(
  MainContract.abi,
  "0x29A2505a6bD892B0604789c456a073bcE4Ea7fb0"
);
```

Fatto questo puoi lanciare il client con

```bash
npm run start
```

Se tutto e' andato bene puoi visitare il sito [Polyscan] (https://mumbai.polygonscan.com/),
incollare l'address del contract e visualizzare tutte le transazioni da e verso la blockchain
e debuggare da qua.
Come prima transazione ci deve essere "Contract Creation".

N.B. Per far funzionare il random bisogna mandare LINK token al contract address.
Per cui da Metamask, seleziona LINK, fai Send e mandali all'address del Contract.
Chiamare Chainlink su Polygon costa 0.0001 LINK invece che i 0.1 LINK di Kovan, per cui basta
mandarne > 0.0001 LINK.

Documentazione:
[Polygon] (https://docs.polygon.technology/docs/develop/alchemy)
