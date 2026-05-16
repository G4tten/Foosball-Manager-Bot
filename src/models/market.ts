export interface MarketOffer {
  id: string;
  playerRequestedId: string; 
  buyerTeamId: string;       
  sellerTeamId: string | null; 
  prezzoOfferto: number;    
  statoTrattativa: 'in_attesa' | 'accettata' | 'rifiutata';
  dataOfferta: Date;
}