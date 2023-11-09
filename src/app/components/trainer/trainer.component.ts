import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {
  trainer!: Trainer
  trainerId!: string

  constructor(private route: ActivatedRoute, private trainerService: TrainerService) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.trainerId = params['id'];
      this.trainerService.getTrainer(+this.trainerId).subscribe((data) => {
        this.trainer = data;
      });
    });
  }
}