import type { Plat } from '../services/plats';
export type { Plat };

export interface LigneCommande {
  plat: Plat;
  quantite: number;
}
