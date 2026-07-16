import { Component, signal, computed } from '@angular/core';
import { Header } from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { Restaurant } from './models/restaurant';
import { PlatCard } from './components/plat-card/plat-card';
import { Commande } from './components/commande/commande';
import { Plat } from './services/plats';
import { LigneCommande } from './models/plats';
import { Inscription } from './components/inscription/inscription';

@Component({
  selector: 'app-root',
  imports: [Header, RestaurantList, PlatCard, Commande, Inscription],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé aux crevettes', currentRating: 0 },
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru aux pieds de bœuf', currentRating: 0 },
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo', specialty: 'Poulet DG', currentRating: 0 },
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', specialty: 'Poisson braisé', currentRating: 0 },
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', specialty: 'Bobolo et sauce arachide', currentRating: 0 },
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', specialty: 'Koki et plantain', currentRating: 0 },
  ]);

  ratedCount = computed(() => this.restaurants().filter(r => r.currentRating > 0).length);

  averageRating = computed(() => {
    const rated = this.restaurants().filter(r => r.currentRating > 0);
    if (rated.length === 0) return 0;
    return rated.reduce((sum, r) => sum + r.currentRating, 0) / rated.length;
  });

  onRestaurantRated(event: { id: number; rating: number }) {
    this.restaurants.update(list =>
      list.map(r => r.id === event.id ? { ...r, currentRating: event.rating } : r)
    );
  }

  commande = signal<LigneCommande[]>([]);

  onPlatAjoute(plat: Plat) {
    this.commande.update((lignes) => {
      const existing = lignes.find(l => l.plat.id === plat.id);
      if (existing) {
        return lignes.map(l => l.plat.id === plat.id ? { ...l, quantite: l.quantite + 1 } : l);
      }
      return [...lignes, { plat, quantite: 1 }];
    });
  }

  onIncrementer(id: string) {
    this.commande.update(lignes =>
      lignes.map(l => l.plat.id === id ? { ...l, quantite: l.quantite + 1 } : l)
    );
  }

  onDecrementer(id: string) {
    this.commande.update(lignes =>
      lignes
        .map(l => l.plat.id === id ? { ...l, quantite: l.quantite - 1 } : l)
        .filter(l => l.quantite > 0)
    );
  }

  onSupprimer(id: string) {
    this.commande.update(lignes => lignes.filter(l => l.plat.id !== id));
  }

  onVider() {
    this.commande.set([]);
  }
}
