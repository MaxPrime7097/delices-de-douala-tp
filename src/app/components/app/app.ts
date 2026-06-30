import { Component, signal, computed } from '@angular/core';
import { Header } from '../header/header';
import { RestaurantList } from '../restaurant-list/restaurant-list';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-app',
  imports: [Header, RestaurantList],
  templateUrl: './app.html',
  styleUrl: './app.css',
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
}
