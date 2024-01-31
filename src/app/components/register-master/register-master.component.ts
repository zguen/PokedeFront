import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { Master } from 'src/app/models/master';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-register-master',
  templateUrl: './register-master.component.html',
  styleUrls: ['./register-master.component.css'],
})
export class RegisterMasterComponent {
  master: Master = {
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    password_confirm: '',
    admin: false,
  };

  passwordConfirmError = false;
  registerOk = true;
  isFormSubmit = false;
  message: string | null = null;

  constructor(private masterService: MasterService, private router: Router) {}

  registerMaster(form: NgForm) {
    this.isFormSubmit = true;

    this.passwordConfirmError =
      this.master.password !== this.master.password_confirm;

    if (form.valid && !this.passwordConfirmError) {
      this.masterService.registerMaster(this.master).subscribe({
        next: (response) => {
          this.message =
            'Un e-mail de confirmation a été envoyé. Veuillez le valider dans les 24 heures.';

          setTimeout(() => {
            this.message = null;
            this.router.navigate(['/master']);
          }, 5000); // Ferme le message après 5 secondes
        },
        error: (error) => {
          this.registerOk = false;
        },
      });
    }
  }
}
