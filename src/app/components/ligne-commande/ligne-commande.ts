import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LigneCommande } from '../../models/plats';

@Component({
  selector: 'app-ligne-commande',
  imports: [DecimalPipe],
  templateUrl: './ligne-commande.html',
  styleUrl: './ligne-commande.css',
})
export class LigneCommandeComponent {
  ligne = input.required<LigneCommande>();
  incrementer = output<string>();
  decrementer = output<string>();
  supprimer = output<string>();
}
