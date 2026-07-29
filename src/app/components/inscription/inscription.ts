import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { User } from '../../models/user';
import { motsDePasseIdentiques } from '../../validators';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  private readonly fb = inject(FormBuilder);

  readonly inscriptionForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: [motsDePasseIdentiques] });

  get firstName()       { return this.inscriptionForm.controls.firstName; }
  get lastName()        { return this.inscriptionForm.controls.lastName; }
  get email()           { return this.inscriptionForm.controls.email; }
  get password()        { return this.inscriptionForm.controls.password; }
  get confirmPassword() { return this.inscriptionForm.controls.confirmPassword; }

  private readonly _clients = signal<User[]>([]);
  readonly clients = this._clients.asReadonly();

  private readonly _indexEdite = signal<number | null>(null);
  readonly enEdition = computed(() => this._indexEdite() !== null);

  get user() { return this.inscriptionForm.value; }

  soumettre(): void {
    if (this.inscriptionForm.invalid) return;
    const { confirmPassword, ...userData } = this.inscriptionForm.value;
    const i = this._indexEdite();
    if (i === null) {
      this._clients.update(l => [...l, { ...userData, id: Date.now().toString() } as User]);
    } else {
      this._clients.update(l => l.map((c, idx) => idx === i ? { ...c, ...userData } as User : c));
      this._indexEdite.set(null);
    }
    this.inscriptionForm.reset();
  }

  modifier(i: number): void {
    const client = this.clients()[i];
    this.inscriptionForm.patchValue({
      firstName: client.firstName ?? '',
      lastName:  client.lastName ?? '',
      email:     client.email,
      password:  client.password,
      confirmPassword: client.password,
    });
    this._indexEdite.set(i);
  }

  supprimer(i: number): void {
    this._clients.update(l => l.filter((_, idx) => idx !== i));
    if (this._indexEdite() === i) {
      this._indexEdite.set(null);
      this.inscriptionForm.reset();
    }
  }
}
