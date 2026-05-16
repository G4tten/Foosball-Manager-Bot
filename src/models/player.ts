import type { LeagueTier } from "./leagues";
import type { StoricoTeam } from "./storico-team";


export interface Player {
  id: string;
  nome: string;
  cognome: string;
  ruoloPredefinito: 'attaccante' | 'difensore';
  infortunato: boolean;
  teamId: string | null;
  tierAttuale: LeagueTier;
  valoreMercato: number;
  
  abilita: {
    tiroDritto: number;
    spizzata: number;
    dribbling: number;
    marcatura: number;
    riflessi: number;
  };

  carriera: {
    partiteTotali: number;
    golTotali: number;
    parateTotali: number;
    storicoStagioni: StoricoTeam[];
  };
}