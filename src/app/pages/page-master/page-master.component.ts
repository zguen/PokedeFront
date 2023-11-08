import { Component } from '@angular/core';
import { Master } from 'src/app/models/master';
import { Trainer } from 'src/app/models/trainer';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.css'],
})
export class PageMasterComponent {
  master!: Master;
  display: boolean = false;
  trainers?: Trainer[];

  newTrainer: Trainer = {
    firstname: '',
    nickname: '',
    password: '',
    id_master: 1,
  };

  statutCreate = true;

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.masterService.getMasterProfil().subscribe({
      next: (response) => {
        this.display = true;
        this.master = response;
        this.trainers = response.trainers;
        this.newTrainer.id_master = this.master.id
      },
      error: (error) => {
        this.display = true;
      },
    });
  }

  addTrainer() {
    this.masterService.addTrainerByMaster(this.newTrainer).subscribe({
      next: (response) => {
        this.router.navigate([`/master`]);
      },
      error: (error) => {
        this.statutCreate = false;
      },
    });
  }
}
