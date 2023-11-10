import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInTrainer: Trainer | null = null;

  loginTrainer(trainer: Trainer): void {
    // Logique de connexion
    this.loggedInTrainer = trainer;
    console.log('dans service', this.loggedInTrainer);
  }

  logoutTrainer(): void {
    // Logique de déconnexion
    this.loggedInTrainer = null;
  }

  isAuthenticated(): boolean {
    // Vérifie si un trainer est connecté
    return !!this.loggedInTrainer;
  }

  getLoggedInTrainer(): Trainer | null {
    console.log(
      'Logged in trainer du service getLogged:',
      this.loggedInTrainer
    );
    return this.loggedInTrainer;
  }

  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  constructor() {}
}
