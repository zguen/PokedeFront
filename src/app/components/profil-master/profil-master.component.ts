import { Component, Input } from '@angular/core';
import { Master } from 'src/app/models/master';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-profil-master',
  templateUrl: './profil-master.component.html',
  styleUrls: ['./profil-master.component.css'],
})
export class ProfilMasterComponent {
  isAdmin: boolean = false;

  
  constructor(private router: Router, private masterService: MasterService) {}
  @Input() profil!: Master;
  
  ngOnInit() {
    this.masterService.getMasterProfil().subscribe((master) => {
      this.isAdmin = master.admin;
    });
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
