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