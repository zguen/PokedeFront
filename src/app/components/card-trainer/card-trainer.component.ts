import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-card-trainer',
  templateUrl: './card-trainer.component.html',
  styleUrls: ['./card-trainer.component.css'],
})
export class CardTrainerComponent {
  @Input() trainer!: Trainer;

  constructor() {}

  majusculeFirst() {
    const prenom =
      this.trainer.nickname.charAt(0).toUpperCase() + this.trainer.nickname.slice(1);
    return prenom;
  }
}
