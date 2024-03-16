import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInTrainer: Trainer | null = null;

  loginTrainer(trainer: Trainer): void {
    this.loggedInTrainer = trainer;

    // Déclenche la déconnexion automatique après 30 minutes d'inactivité
    setTimeout(() => {
      this.logoutTrainer();
    }, 30 * 60 * 1000); // 30 minutes en millisecondes
  }

  logoutTrainer(): void {
    this.loggedInTrainer = null;
  }

  isAuthenticated(): boolean {
    return !!this.loggedInTrainer;
  }

  getLoggedInTrainer(): Trainer | null {
    return this.loggedInTrainer;
  }

  isLoggedIn = false;

  constructor() {}
}
