import { Injectable, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Plat {
  id: string;
  nom: string;
  prix: number;
  categorie: 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class PlatsService {
  private readonly resource = httpResource<Plat[]>(
    () => `${environment.serverUrl || ''}/api/plats.json`
  );

  readonly isLoading = computed(() => this.resource.isLoading());
  readonly error = computed(() => this.resource.error());
  readonly plats = computed(() => this.resource.value() ?? []);

  readonly categories = ['Toutes', 'Plats', 'Grillades', 'Végétarien', 'Boissons'] as const;
  readonly categorie = signal<(typeof this.categories)[number]>('Toutes');

  readonly platsFiltres = computed(() => {
    const plats = this.plats();
    const cat = this.categorie();

    if (cat === 'Toutes') return plats;
    return plats.filter(plat => plat.categorie === cat);
  });

  private readonly tick = toSignal(interval(10000), { initialValue: 0 });

  readonly platDuJour = computed(() => {
    const plats = this.plats();
    if (!plats.length) return null;
    return plats[this.tick() % plats.length];
  });

  setCategorie(categorie: (typeof this.categories)[number]) {
    this.categorie.set(categorie);
  }
}