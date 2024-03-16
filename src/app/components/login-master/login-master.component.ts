import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginMaster } from 'src/app/models/login-master';
import { ResetToken } from 'src/app/models/reset-token';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.css'],
})
export class LoginMasterComponent {
  master: LoginMaster = {
    email: '',
    password: '',
  };
  isFormValidate = false;
  loginNone = false;
  showPassword: boolean = false;
  email: string = '';
  resetEmail: string = '';

  constructor(private masterService: MasterService, private router: Router) {}

  login(loginForm: NgForm) {
    this.isFormValidate = true;
    // Vérification si le formulaire est valide
    if (loginForm.valid) {
      // Appel du service de connexion
      this.masterService.loginMaster(this.master).subscribe({
        next: (response) => {
          // Stockage du jeton d'accès dans la session
          sessionStorage.setItem('token', response.accessToken);
          this.masterService.isLog$.next(true);
        },
        // En cas d'erreur lors de la requête
        error: (error) => {
          this.loginNone = true;
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  bonjourModal() {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  }
  aurevoirModal() {
    const dialog = document.querySelector('dialog');
    dialog?.close();
  }
  envoyerMail(): void {
    this.masterService.envoyerMail(this.resetEmail).subscribe({
      next: (response: ResetToken) => {
        if (response.master) {
          // Ajoutez cette vérification
          alert('Le mail de réinitialisation a été envoyé avec succès.');
          this.aurevoirModal();
        } else {
          alert('Aucun utilisateur trouvé avec cet email.');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la requête:', error);
        alert(
          "Une erreur s'est produite lors de l'envoi du mail de réinitialisation."
        );
      },
    });
  }
}
