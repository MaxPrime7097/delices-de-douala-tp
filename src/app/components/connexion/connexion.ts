import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  private readonly fb = inject(FormBuilder); 
  
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email()    
    { return this.loginForm.controls.email; } 
  get password() 
    { return this.loginForm.controls.password; } 

  soumettre(): void { 
    if (this.loginForm.invalid) return; 
    console.log('Connexion :', this.loginForm.value); 
  }
}
