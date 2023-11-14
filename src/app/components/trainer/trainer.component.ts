import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Trainer } from 'src/app/models/trainer';
import { AuthService } from 'src/app/services/auth.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {
  trainer!: Trainer
  trainerId!: string

  constructor(private route: ActivatedRoute, private trainerService: TrainerService, private authService: AuthService) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.trainerId = params['id'];
      this.trainerService.getTrainer(+this.trainerId).subscribe((data) => {
        this.trainer = data;
      });
    });
  }

  logout() {
    this.authService.logoutTrainer()
  }

  
}