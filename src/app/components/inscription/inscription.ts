import { Component, signal, computed } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { JsonPipe as JsonPipeCommon } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, JsonPipeCommon],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  user: User = { email: '', password: '', firstName: '', lastName: '' };
  confirmPassword = '';
  submitted = false;

  private readonly _clients = signal<User[]>([]);
  readonly clients = this._clients.asReadonly();

  private readonly _indexEdite = signal<number | null>(null);
  readonly enEdition = computed(() => this._indexEdite() !== null);

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.user.password !== this.confirmPassword;
  }

  get formValid(): boolean {
    return !!this.user.email.trim() && !!this.user.password.trim() && this.user.password === this.confirmPassword;
  }

  soumettre(): void {
    this.submitted = true;
    if (!this.formValid) return;
    const i = this._indexEdite();
    if (i === null) {
      this._clients.update(l => [...l, { ...this.user, id: Date.now().toString() }]);
    } else {
      this._clients.update(l => l.map((c, idx) => idx === i ? { ...this.user } : c));
      this._indexEdite.set(null);
    }
    this.user = { email: '', password: '', firstName: '', lastName: '' };
    this.confirmPassword = '';
    this.submitted = false;
  }

  modifier(i: number): void {
    this.user = { ...this.clients()[i] };
    this._indexEdite.set(i);
  }

  supprimer(i: number): void {
    this._clients.update(l => l.filter((_, idx) => idx !== i));
  }
}
