import { Component, input, output } from '@angular/core';
import { StarRating } from '../star-rating/star-rating';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>();
  restaurantRated = output<{ id: number; rating: number }>();

  onRatingChanged(rating: number) {
    this.restaurantRated.emit({ id: this.restaurant().id, rating });
  }
}
