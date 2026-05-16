import type { LeagueTier } from "./leagues";


export interface StoricoTeam {
  teamId: string;
  nomeTeam: string;
  legaConQuestoTeam: LeagueTier;
  partiteGiocateConQuestoTeam: number;
  golFattiConQuestoTeam: number;
  parateFatteConQuestoTeam: number;
}