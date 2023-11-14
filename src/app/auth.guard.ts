import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifie si le dresseur connecté existe
    if (this.authService.getLoggedInTrainer()) {
      // Si oui, extrait l'ID
      const loggedInTrainerId = this.authService.getLoggedInTrainer()?.id;

      // Récupère l'ID de la page que l'utilisateur essaie de charger
      const requestedTrainerId = Number(route.paramMap.get('id'));

      // Compare les IDs et prend la décision appropriée
      if (loggedInTrainerId === requestedTrainerId) {
        return true;
      } else {
        // Redirige vers la page de connexion si les IDs ne correspondent pas
        this.router.navigate(['/master']);
        return false;
      }
    } else {
      // Si le dresseur connecté n'existe pas, redirige vers la page de connexion
      this.router.navigate(['/master']);
      return false;
    }
  }
}
