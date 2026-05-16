import type { LeagueTier } from "./leagues";
import type { Player } from "./player";

export interface Team {
  id: string;
  nome: string; 
  budgetCrediti: number; 
  legaAttuale: LeagueTier;
  
  statistiche: {
    vittorie: number;
    sconfitte: number;
    golFatti: number;
    golSubiti: number;
  };
  
  rosa: Player[]; // Minimo 2, massimo 4
  formazione: {
    attaccante: Player;
    difensore: Player;
  };
}