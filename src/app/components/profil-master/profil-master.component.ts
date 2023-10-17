import { Component, Input } from '@angular/core';
import { Master } from 'src/app/models/master';

@Component({
  selector: 'app-profil-master',
  templateUrl: './profil-master.component.html',
  styleUrls: ['./profil-master.component.css'],
})
export class ProfilMasterComponent {
  @Input() profil!: Master;

  logout() {
    sessionStorage.clear();
    location.reload();
  }
}
