import { Component } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  isConnected = false;

  constructor(private masterService: MasterService) { }

  ngOnInit() {
    this.masterService.getMasterConnected().subscribe((master) => {
      this.isConnected = !!master;
    });
  }
}
