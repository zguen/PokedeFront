import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-captured-pokemons',
  templateUrl: './captured-pokemons.component.html',
  styleUrls: ['./captured-pokemons.component.css'],
})
export class CapturedPokemonsComponent implements OnInit {
  @Input() capturedPokemons!: Pokemon[];

  constructor(
    private pokemonService: PokemonsService,
    private authService: AuthService
  ) {}

  public displayedPokemonCount: number = 5; // Commencez avec les 5 premiers

  public loadMorePokemon() {
    this.displayedPokemonCount += 5; // Ajoute à chaque clic
  }

  ngOnInit(): void {
    this.loadCapturedPokemons();
  }

  private loadCapturedPokemons() {
    // Obtien le dresseur connecté
    const loggedInTrainer = this.authService.getLoggedInTrainer();

    if (loggedInTrainer && loggedInTrainer.id) {
      
      this.pokemonService.getPokemonsByTrainer(loggedInTrainer.id).subscribe(
        (capturedPokemons) => {
          
          this.capturedPokemons = capturedPokemons.sort((a, b) => a.pokedexid - b.pokedexid);
          this.pokemonService.capturedPokemon$.next(this.capturedPokemons);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des Pokémon capturés :',
            error
          );
        }
      );
    } else {
      // Gérez le cas où loggedInTrainer ou loggedInTrainer.id est undefined
      console.error('Dresseur non connecté ou ID non défini');
    }
  }
}
