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
    nickname: '',
    email: '',
    password: '',
    password_confirm: '',
    admin: false,
  };

  passwordConfirmError = false;
  registerOk = true;
  isFormSubmit = false;

  constructor(private masterService: MasterService, private router: Router) {}

  registerMaster(form: NgForm) {
    this.isFormSubmit = true;

    this.passwordConfirmError =
      this.master.password !== this.master.password_confirm;
    
    if (!this.master.nickname) {
      // Si le champ "surnom" est vide, remplissez-le avec la valeur du champ "prénom"
      this.master.nickname = this.master.firstname;
    }

    if (form.valid && !this.passwordConfirmError) {
      this.masterService.registerMaster(this.master).subscribe({
        next: (response) => {
          this.router.navigate(['/master']);
        },
        error: (error) => {
          this.registerOk = false;
        },
      });
    }
  }

}
