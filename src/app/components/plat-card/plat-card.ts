import { Component, inject, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PlatsService, Plat } from '../../services/plats';

@Component({
  selector: 'app-plat-card',
  imports: [CurrencyPipe],
  templateUrl: './plat-card.html',
  styleUrl: './plat-card.css',
})
export class PlatCard {
  platAjoute = output<Plat>();

  private readonly platsService = inject(PlatsService);

  categories = this.platsService.categories;
  categorie = this.platsService.categorie;
  platsFiltres = this.platsService.platsFiltres;
  isLoading = this.platsService.isLoading;
  error = this.platsService.error;
  platDuJour = this.platsService.platDuJour;

  setCategorie(categorie: (typeof this.categories)[number]) {
    this.platsService.setCategorie(categorie);
  }
}
