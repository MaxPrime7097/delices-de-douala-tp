import { Component, computed, input, output } from '@angular/core';
import { LigneCommande } from '../../models/plats';
import { LigneCommandeComponent } from '../ligne-commande/ligne-commande';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-commande',
  imports: [LigneCommandeComponent, DecimalPipe],
  templateUrl: './commande.html',
  styleUrl: './commande.css',
})
export class Commande {
  commande = input<LigneCommande[]>([]);

  incrementer = output<string>();
  decrementer = output<string>();
  supprimer = output<string>();
  vider = output<void>();

  total = computed(() =>
    this.commande().reduce((sum, l) => sum + l.plat.prix * l.quantite, 0)
  );
}
