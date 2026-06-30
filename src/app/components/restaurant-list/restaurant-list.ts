import { Component, input, output } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList {
  restaurants = input<Restaurant[]>([]);
  restaurantRated = output<{ id: number; rating: number }>();

  onRated(event: { id: number; rating: number }) {
    this.restaurantRated.emit(event);
  }
}
