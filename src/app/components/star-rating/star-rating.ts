import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  currentRating = input<number>(0);
  ratingChanged = output<number>();

  stars = [1, 2, 3, 4, 5];
  hoveredStar = signal<number>(0);

  isActive(star: number): boolean {
    const hovered = this.hoveredStar();
    if (hovered > 0) return star <= hovered;
    return star <= this.currentRating();
  }

  onStarClick(star: number) {
    // Bonus 10 : cliquer sur la même étoile retire la note
    const newRating = star === this.currentRating() ? 0 : star;
    this.ratingChanged.emit(newRating);
  }
}
