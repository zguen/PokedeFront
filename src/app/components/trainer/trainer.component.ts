import { Component} from '@angular/core';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent {
 trainer!: Trainer;

  constructor() {}

  capitalFirst() {
    const prenom =
      this.trainer.firstname.charAt(0).toUpperCase() +
      this.trainer.firstname.slice(1);
    return prenom;
  }
}
