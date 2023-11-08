import { Component, Input } from '@angular/core';
import { Master } from 'src/app/models/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-master',
  templateUrl: './profil-master.component.html',
  styleUrls: ['./profil-master.component.css'],
})
export class ProfilMasterComponent {

  constructor (private router: Router) {}
  @Input() profil!: Master;

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
