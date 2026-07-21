import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  user: Pick<User, 'email' | 'password'> = { email: '', password: '' };
  submitted = false;
  success = false;

  get formValid(): boolean {
    return !!this.user.email.trim() && !!this.user.password.trim();
  }

  soumettre(): void {
    this.submitted = true;
    if (!this.formValid) return;
    this.success = true;
  }
}
