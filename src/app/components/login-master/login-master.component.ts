import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginMaster } from 'src/app/models/login-master';
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

  constructor(private masterService: MasterService, private router: Router) {}

  login(loginForm: NgForm) {
    this.isFormValidate = true;
    // Vérification si le formulaire est valide
    if (loginForm.valid) {
      // Appel du service de connexion du "master" avec les informations saisies
      this.masterService.loginMaster(this.master).subscribe({
        // En cas de succès de la requête
        next: (response) => {
          // Stockage du jeton d'accès dans la session
          sessionStorage.setItem('token', response.accessToken);
          // Redirection vers la page réservée au "master"
          this.router.navigate(['/master']);
          // Rechargement de la page pour appliquer les éventuels changements
          location.reload();
        },
        // En cas d'erreur lors de la requête
        error: (error) => {
          this.loginNone = true;
        },
      });
    }
  }
}
