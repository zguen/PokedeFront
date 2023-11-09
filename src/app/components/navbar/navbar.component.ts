import { Component, HostListener } from '@angular/core';
import { Master } from 'src/app/models/master';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  master! : Master
  textLargeScreen: string = 'Mon PC Pokemon';
  textSmallScreen: string = 'Mes Pokemon';

  isLargeScreen: boolean = true;
  // Utilisez HostListener pour détecter les changements de taille d'écran
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Fonction pour vérifier la taille de l'écran
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768; // Définissez la largeur minimale de l'écran pour considérer comme "grand écran"
  }
}
