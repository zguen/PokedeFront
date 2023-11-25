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
    this.displayedPokemonCount += 5; // Ajoute a chaque clic
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(
      (allPokemons) => {
        // Obtenez le dresseur connecté
        const loggedInTrainer = this.authService.getLoggedInTrainer();

        if (loggedInTrainer && loggedInTrainer.pokemon) {
          // Filtrez les Pokémon capturés par le dresseur connecté
          this.capturedPokemons = allPokemons.filter((pokemon) =>
            loggedInTrainer!.pokemon!.some(
              (capturedPokemon) =>
                capturedPokemon.pokedexid === pokemon.pokedexid
            )
          );
        } else {
          // Gérez le cas où loggedInTrainer ou loggedInTrainer.pokemon est undefined
          console.error('Dresseur non connecté ou Pokémon non défini');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    );
  }
}
