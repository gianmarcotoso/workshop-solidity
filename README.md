# Corso Ethereum / Solidity

## Slide

Per avviare le slide, installare le dipendenze utilizzando `npm install`, dopodiché lanciare
`npm start`.

## Esercizi

La cartella `playground` contiene al suo interno un progetto Truffle con le soluzioni agli
esercizi. Utilizzare `npm install` per installare le dipendenze, dopodiché avviare Truffle
con `truffle develop`.

-   Per compilare ed effettuare il deploy dei contratti, utilizzare `migrate --reset`
-   Ogni contratto è accessibile utilizzando il metodo `deployed` su una variabile globale avente
    lo stesso nome del contratto, ad esempio:

```
> const instance = await HelloWorld.deployed()
> instance.greet()
```

## Frontend React

> Attenzione! Per poter procedere con questa sezione è necessario aver configurato e installato correttamente Python e i tool di compilazione C/C++ per il sistema operativo in uso!

La cartella `playground/frontend` contiene un semplice (e unicamente dimostrativo! progetto scritto
in ReactJS e Web3 che mostra come interagire con uno smart contract da un frontend web.
Per avviare il progetto è necessario:

-   aprire un terminale, posizionarsi dentro `playground` e digitare `npm run ganache`.
    Questo comando avvierà un'istanza di `ganache-cli`, che rende disponibile una blockchain Ethereum
    locale vuota, pratica per effettuare test in fase di sviluppo;
-   tenendo aperto il terminale del punto precedente, aprire un altro terminale, posizionarsi dentro
    `playground` e lanciare `npm run truffle deploy`. Questo comando effettua la pubblicazione di tutti
    gli Smart Contract sulla blockchain creata da `ganache-cli`;
-   prendere nota dell'indirizzo del Contract Account relativo al contratto `EventExample` e inserirlo
    all'interno del file `playground/frontend/src/app/app.component.jsx`, come valore della variabile
    `CONTRACT_ADDRESS` (riga 6);
-   entrare con un terminale in `playground/frontend` e installare le dipendenze con `npm install`;
-   lanciare `npm start` per avviare la compilazione dell'applicativo React;
-   Visitare `http://localhost:1234` per visualizzare l'applicativo;

## Link Utili

-   Windows Build Tools: https://github.com/felixrieseberg/windows-build-tools
-   Distributed vs Decentralized: https://medium.com/distributed-economy/what-is-the-difference-between-decentralized-and-distributed-systems-f4190a5c6462
-   Gas and fees: https://github.com/ethereum/wiki/wiki/Design-Rationale#gas-and-fees
-   Variabili globali: https://ethereum.stackexchange.com/questions/2701/do-the-contracts-of-ethereum-have-the-access-to-the-nonce-of-the-blocks/2702#2702?newreg=f8ec6f613ee944e0a8e79d528f768a1d
-   Concorrenza: https://ethereum.stackexchange.com/questions/2856/what-happens-when-a-smart-contract-gets-several-similar-calls-in-the-same-block
