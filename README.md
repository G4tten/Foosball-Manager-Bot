# Foosball-Manager-Bot
🏆 Bigliardino Manager Bot: Un'esperienza di gestione sportiva testuale. Crea il tuo club, allena i giocatori, gestisci l'intesa tra attaccanti e difensori e sfida altri utenti in una classifica globale. Il calcio balilla non è mai stato così competitivo. 📈

## 🏟️ Il Progetto
L'obiettivo è creare un'esperienza simile a *Online Soccer Manager (OSM)* ma calata sul calcio balilla. Il giocatore veste i panni del manager di una squadra di bigliardino, gestendo acquisti, allenamenti e formazioni.

## 🎢 Come avviare il progetto in locale

Poiché le dipendenze esterne non vengono caricate su GitHub per motivi di leggerezza e sicurezza, dopo aver clonato il repository è necessario ripristinare l'ambiente.

1. **Installa le dipendenze locali (TypeScript e Vitest):**
   ```bash
   npm install

2. **Verifica che l'ambiente sia pronto:**
    ```bash
    npx tsc --version

## 🚀 Caratteristiche Principali
- **Bigliardino Mercato:** Sistema di compravendita giocatori (Attaccanti e Difensori).
- **Sistema di Intesa:** Meccanica di compatibilità tra coppie di giocatori (ispirata alla chimica di FIFA).
- **Allenamento & Infrastrutture:** Migliora le statistiche dei tuoi atleti acquistando nuovi polsini, fasce per il grip o tavoli professionali.
- **Campionato "Serie A":** Classifica globale contro altri utenti o bot.
- **Gestione Infortuni:** Dalle slogature ai "colpi nell'occhio", gestisci l'infermeria per non perdere statistiche preziose.

## 🛠️ Tech Stack (Work in Progress)
- **Language:** Python
- **Framework:** Telegraf (per l'interfaccia Telegram)
- **Database:** PostgreSQL / SQLite
- **Testing:** Vitest (per la simulazione dei match e della logica di gioco)

## 📈 Roadmap
- [ ] Setup del Bot e comando creazione squadra
- [ ] Implementazione Database giocatori
- [ ] Motore di gioco per i match al meglio di 3
- [ ] Sistema di allenamento con timer asincroni
- [ ] Mercato globale tra utenti

---
*Progetto nato per gioco, sviluppato per passione (e per evitare la grafica).*