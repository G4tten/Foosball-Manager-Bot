# Project Decisions Log - Foosball Manager Bot

Questo documento tiene traccia delle scelte architettoniche e tecnologiche fatte durante lo sviluppo, spiegandone le motivazioni, i vantaggi e le alternative considerate.

---

## [2026-05-13] - Scelta dello Stack Tecnologico (Node.js, TypeScript, Vitest)

### Contesto
Il progetto richiede la gestione di logiche complesse (statistiche giocatori, calcolo punteggi, gestione mercati) e un'integrazione fluida con le API di Telegram. La manutenibilità a lungo termine e la robustezza del codice sono priorità fondamentali.

### 1. Node.js (Ambiente di Runtime)
**Decisione:** Utilizzare Node.js come motore per l'esecuzione del bot.
- **Perché:** È lo standard per lo sviluppo di bot Telegram grazie alla gestione asincrona degli eventi (non-blocking I/O). La vasta disponibilità di librerie (come `telegraf` o `node-telegram-bot-api`) accelera notevolmente lo sviluppo.
- **Conseguenze:** Permette di scalare facilmente il bot e di trovare supporto immediato nella documentazione della community.

### 2. TypeScript (Linguaggio)
**Decisione:** Adottare TypeScript come superset di JavaScript.
- **Perché:** In un progetto basato su statistiche e modelli di dati (Giocatori, Match, Squadre), avere il **tipaggio statico** riduce drasticamente i bug a runtime. TypeScript permette di intercettare errori di logica durante la scrittura del codice (es. passare una stringa dove serve un numero).
- **Conseguenze:** Il codice è più "auto-esplicativo" (grazie a interfacce e tipi) e rende molto più semplice la collaborazione con altri sviluppatori o il refactoring futuro.

### 3. Vitest (Framework di Testing)
**Decisione:** Utilizzare Vitest per i test unitari e di integrazione.
- **Perché:** È estremamente veloce, moderno e nativamente compatibile con TypeScript.
- **Conseguenze:** Garantisce che ogni modifica alla logica di calcolo dei punteggi non rompa le funzionalità esistenti (Regression Testing), mantenendo alta la qualità del codice.

---

## [2026-05-15] - Organizzazione del Codice e Isolamento dell'Ambiente

### Contesto
Con l'inizializzazione tecnica del progetto, è necessario definire una struttura delle cartelle chiara, scalabile e standard, garantendo al contempo che le dipendenze installate rimangano isolate senza generare conflitti sul sistema locale.

### 1. Struttura del Codice basata sulla cartella `src/`
**Decisione:** Racchiudere tutto il codice sorgente del bot all'interno di una cartella dedicata denominata `src/`.
- **Perché:** Permette di separare nettamente il codice scritto a mano (i file `.ts`) dalle configurazioni del progetto (come `package.json` o `tsconfig.json`). Inoltre, fornisce un confine preciso al compilatore TypeScript, ottimizzando i tempi di scansione ed evitando che analizzi file non pertinenti.
- **Conseguenze:** Maggiore ordine visivo, scalabilità nell'organizzazione dei moduli futuri (comandi, database, motori di calcolo) e adozione di uno standard universale facilmente riconoscibile da altri sviluppatori.

---

## [2026-05-16] - Architettura del Core Engine e Struttura Dati dei Modelli

### Contesto
Con l'introduzione delle logiche di campionato, delle abilità e del calciomercato, è necessario definire un'architettura dati solida e flessibile per il Core Engine del bot. Il sistema deve simulare le dinamiche reali del biliardino all'interno di un'esperienza manageriale asincrona (PvE), garantendo al contempo coerenza storica e un tracciamento pulito delle transazioni.

### 1. Scomposizione delle Informazioni in Cinque Strutture Dati Separate
**Decisione:** Separare la logica di gioco in cinque modelli distinti: `LeagueTier`, `StoricoStagione`, `Player`, `Team` e `MarketOffer`.
- **Perché:** Segue il principio di granularità del software. Isolare i livelli competitivi (`LeagueTier`) garantisce l'assenza di errori di battitura nel codice. Separare nettamente le abilità dinamiche del giocatore (utili al simulatore dei match) dalle sue statistiche storiche evita la ridondanza dei dati nel database.
- **Conseguenze:** Il codice risulta altamente modulare. Sarale possibile modificare l'algoritmo di simulazione o quello del mercato senza rischiare di corrompere i dati anagrafici dei giocatori o delle squadre.

### 2. Scelta del Modello di Gioco Asincrono (PvE con Leaderboard Globale)
**Decisione:** Strutturare il game loop in modo che ogni utente competa nel proprio "mondo" contro gironi composti da squadre della CPU, spostando il confronto con gli altri utenti reali su una classifica/leaderboard globale basata su punti prestigio.
- **Perché:** La gestione del PvP (Player vs Player) in tempo reale su un bot Telegram introduce criticità bloccanti, come i tempi di attesa per le risposte degli utenti e la gestione complessa della sincronizzazione dei server. Il PvE asincrono garantisce fluidità immediata all'utente (che può giocare quando vuole) pur mantenendo alto il senso di competizione grazie alla classifica generale basata sul superamento delle leghe e sui gol fatti.
- **Conseguenze:** Architettura del bot incredibilmente più snella, riduzione del carico sul database e assenza di downtime dovuti a giocatori inattivi.

### 3. Fusione e Semplificazione delle Statistiche Offensive (KISS Principle)
**Decisione:** Unificare i contatori dei gol tradizionali ("dritti") e di quelli di "spizzata" in un'unica statistica complessiva (`golTotali` / `golFattiConQuestoTeam`), eliminando al contempo il tracciamento di palleggi e muri.
- **Perché:** Inizialmente si tendeva a voler tracciare ogni singola micro-azione. Tuttavia, l'accumulo di troppi contatori specifici avrebbe appesantito inutilmente il database senza un reale ritorno di valore per il gameplay. Inoltre, l'interfaccia utente su Telegram ha limiti di spazio: una scheda profilo con troppe voci risulterebbe illeggibile. Si mantiene la distinzione tecnica nelle abilità per l'engine di simulazione, ma si semplifica la visualizzazione storica.
- **Conseguenze:** Codice più pulito, query più veloci e schede dei giocatori eleganti e scannabili in chat stile "Almanacco del Calcio".

### 4. Reinserimento e Dignità delle Statistiche Difensive (`parateTotali`)
**Decisione:** Mantenere e tracciare attivamente il numero di parate a buon fine effettuate dai giocatori, salvandole sia nella carriera assoluta sia nello storico delle singole stagioni.
- **Perché:** In un gioco manageriale basato su ruoli fissi, i difensori e i portieri rischierebbero di avere schede di carriera ingiustamente vuote se l'unico valore celebrativo fosse il gol. Inserire il contatore delle parate restituisce dignità e valore di mercato ai ruoli difensivi, permettendo agli utenti di flessare non solo i propri bomber ma anche i propri "muri" invalicabili.
- **Conseguenze:** Perfetto bilanciamento del valore dei giocatori sul mercato e maggiore varietà nelle strategie di costruzione del team.

### 5. Definizione dei Limiti della Rosa (Minimo 2, Massimo 4 Giocatori)
**Decisione:** Vincolare la rosa di ogni squadra a un minimo rigoroso di 2 giocatori e a un massimo di 4, richiedendo l'assegnazione fissa di un attaccante e un difensore nella formazione titolare.
- **Perché:** Il biliardino tradizionale è un gioco di coppia (2vs2). Impostare il limite minimo a 2 garantisce che la squadra possa sempre scendere in campo, mentre il tetto massimo di 4 permette di avere un paio di sostituti/riserve strategiche (utili in caso di infortuni o per turnover tattico) senza però permettere l'accumulo infinito di giocatori che congelerebbe il mercato.
- **Conseguenze:** Introduzione della gestione degli infortuni e della necessità strategica di gestire i cambi, mantenendo la rosa leggera e controllabile.

### 6. Tracciamento Storico basato sulle Stagioni e sui Passaggi di Lega
**Decisione:** Utilizzare l'array `storicoStagioni` all'interno del modello `Player` per registrare le prestazioni indicizzandole sia per squadra che per livello di lega.
- **Perché:** Nei giochi competitivi è fondamentale differenziare il peso specifico delle statistiche. Un gol o una parata nella lega "Elite" hanno una rilevanza tecnica diversa rispetto a quelli ottenuti nella lega "Principianti". Archiviando i dati in un'istantanea a ogni cambio di stagione o trasferimento (es. Squadra A in Principianti, Squadra A in Intermedi), si preserva la cronologia fedele della crescita del giocatore senza appiattire i contatori.
- **Conseguenze:** Maggiore profondità narrativa e strategica. L'utente può vedere se un calciatore è un veterano che ha trascinato il club attraverso le varie promozioni.

### 7. Modello di Mercato Unificato con Logica di Acquisto Diretto per gli Svincolati
**Decisione:** Adottare l'interfaccia `MarketOffer` per gestire sia le proposte economiche verso le squadre della CPU sia l'acquisto immediato dei parametri zero (Free Agents).
- **Perché:** Centralizzare tutti i movimenti di crediti e calciatori in un unico modello semplifica la logica del codice. Nel caso di giocatori svincolati non esiste una società venditrice con cui trattare: il sistema riutilizza la stessa interfaccia impostando il club venditore a `null` e approvando istantaneamente lo stato della transazione su `accettata` al prezzo fisso del cartellino.
- **Conseguenze:** Generazione di un registro transazioni unico, pulito e centralizzato, che renderà immediata l'implementazione futura di una sezione "Cronologia Trasferimenti" nel bot.