import { ChangeDetectorRef, Component } from '@angular/core';
import { Master } from 'src/app/models/master';
import { Trainer } from 'src/app/models/trainer';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.css'],
})
export class PageMasterComponent {
  master!: Master;
  trainers: Trainer[] = [];
  trainer!: Trainer;
  isConnected!: boolean;
  passwordConfirmError = false;
  isFormSubmit = false;
  statutCreate = true;

  newTrainer: Trainer = {
    nickname: '',
    password: '',
    password_confirm: '',
    id_master: 1,
  };

  constructor(
    private masterService: MasterService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.masterService.isLog$.subscribe((resp) => {
      this.isConnected = resp;
      if (this.isConnected) {
        this.masterService.getMasterProfil().subscribe({
          next: (response) => {
            this.master = response;
            this.trainers = response.trainers!;
            this.masterService.addedTrainer$.subscribe(
              (data) => (this.trainers = data)
            );
            this.masterService.addedTrainer$.next(this.trainers);
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

  addTrainer(form: NgForm) {
    this.isFormSubmit = true;

    this.passwordConfirmError =
      this.newTrainer.password !== this.newTrainer.password_confirm;

    if (form.valid && !this.passwordConfirmError) {
      this.masterService.addTrainerByMaster(this.newTrainer).subscribe({
        next: (response) => {
          this.masterService.getMasterProfil().subscribe({
            next: (response) => {
              this.masterService.addedTrainer$.next(response.trainers!);
            },
            error: (error) => {},
          });
        },
        error: (error) => {
          this.statutCreate = false;
        },
      });
    }
  }
}
