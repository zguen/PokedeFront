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
}
