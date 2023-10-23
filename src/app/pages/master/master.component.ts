import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Master } from 'src/app/models/master';
import { Trainer } from 'src/app/models/trainer';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent {
  master!: Master;
  display: boolean = false;

  trainer?: Trainer[];

  newTrainer: Trainer = {
    firstname: '',
    nickname: '',
    id_master: 1,
  };

  statutCreate = true;

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.masterService.getMasterProfil().subscribe({
      next: (response) => {
        this.display = true;
        this.master = response;
        this.trainer = response.trainer;
      },
      error: (error) => {
        this.display = true;
      },
    });
  }

  addTrainer() {
    this.masterService.addTrainerByMaster(this.newTrainer).subscribe({
      next: (response) => {
        console.log(this.trainer);
      },
      error: (error) => {
        this.statutCreate = false;
      },
    });
    }
}
