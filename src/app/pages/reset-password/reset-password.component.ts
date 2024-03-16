import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  master = {
    password: '',
    password_confirm: '',
  };
  isFormSubmit = false;
  showPassword: boolean = false;
  loginNone = false;
  passwordConfirmError = false;
  reset = true;
  message: string | null = null;
  resetToken: string | null = null;

  constructor(
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resetToken = this.route.snapshot.queryParams['token'];
    console.log('Reset token:', this.resetToken);
  }

  resetPassword(resetForm: NgForm): void {
    this.isFormSubmit = true;
    this.passwordConfirmError =
      this.master.password !== this.master.password_confirm;

    if (
      resetForm.valid &&
      !this.passwordConfirmError &&
      this.resetToken !== null
    ) {
      this.masterService.resetPassword(this.resetToken, this.master).subscribe({
        next: (response) => {
          this.message = 'Votre mot de passe a été changé';

          setTimeout(() => {
            this.message = null;
            this.router.navigate(['/login']);
          }, 5000); // Ferme le message après 5 secondes
        },
        error: (error) => {
          this.reset = false;
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
