import { ChangeDetectorRef, Component } from '@angular/core';
import { Master } from 'src/app/models/master';
import { Trainer } from 'src/app/models/trainer';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.css'],
})
export class PageMasterComponent {
  master!: Master;
  trainers?: Trainer[];
  isConnected!: boolean;

  newTrainer: Trainer = {
    firstname: '',
    nickname: '',
    password: '',
    id_master: 1,
  };

  statutCreate = true;

  constructor(
    private masterService: MasterService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.masterService.isLog$.subscribe((resp) => {
      this.isConnected = resp;      
      if (this.isConnected) {
        this.masterService.getMasterProfil().subscribe({
          next: (response) => {
            this.master = response;      
            this.trainers = response.trainers;
            this.newTrainer.id_master = this.master.id;
          },
        });
      }
    });
    

    if (this.authService.isAuthenticated()) {
      // Redirige vers la page du dresseur connecté
      const loggedInTrainerId = this.authService.getLoggedInTrainer()?.id;
      this.router.navigate(['/trainer', loggedInTrainerId]);
    }
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
