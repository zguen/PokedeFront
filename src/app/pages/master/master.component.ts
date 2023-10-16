import { Component } from '@angular/core';
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

  constructor(private masterService: MasterService) {}

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
}
