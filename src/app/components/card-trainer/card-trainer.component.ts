import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginTrainer } from 'src/app/models/login-trainer';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-card-trainer',
  templateUrl: './card-trainer.component.html',
  styleUrls: ['./card-trainer.component.css'],
})
export class CardTrainerComponent {
  @Input() trainer!: Trainer;

  trainerLog: LoginTrainer = {
    nickname: '',
    password: '',
  };
  isFormValidate = false;
  loginNone = false;

  constructor(private trainerService: TrainerService, private router: Router) {}

  login(loginForm: NgForm) {
    this.isFormValidate = true;
    if (loginForm.valid) {
      this.trainerService.loginTrainer(this.trainerLog).subscribe({
        next: (response) => {
          this.router.navigate(['/trainer/', this.trainer.id]);
        },
        error: (error) => {
          this.loginNone = true;
        },
      });
    }
  }
}
