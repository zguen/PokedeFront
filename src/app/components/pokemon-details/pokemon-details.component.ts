import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  isAdmin: boolean = false;
  isTrainerConnected: boolean = false;

  @Input() pokemon!: Pokemon;
  preEvolution: Pokemon | undefined;
  prePreEvolution: Pokemon | undefined;
  evolutions: Pokemon[] = [];
  postEvolutions: Pokemon[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private trainerService: TrainerService,
    private masterService: MasterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.masterService.getMasterProfil().subscribe((master) => {
      this.isAdmin = master.admin;
    });

    this.route.paramMap.subscribe((params) => {
      const pokemonIdFromRoute = Number(params.get('pokedexid'));

      this.pokemonService
        .getPokemonById(pokemonIdFromRoute)
        .subscribe((data) => {
          this.pokemon = data;

          this.verifierConnexionTrainer();

          // Effacez les évolutions, les pré-évolutions et les pré-pré-évolutions précédentes
          this.evolutions = [];
          this.preEvolution = undefined;
          this.prePreEvolution = undefined;
          this.postEvolutions = []; // Réinitialisez les post-évolutions ici

          if (this.pokemon.pre_evolution) {
            // Si le Pokémon a une pré-évolution:
            this.pokemonService
              .getPokemonById(this.pokemon.pre_evolution)
              .subscribe((preEvolution) => {
                this.preEvolution = preEvolution;

                if (this.preEvolution.pre_evolution) {
                  // Si la pré-évolution a elle-même une pré-évolution:
                  this.pokemonService
                    .getPokemonById(this.preEvolution.pre_evolution)
                    .subscribe((prePreEvolution) => {
                      this.prePreEvolution = prePreEvolution;
                    });
                }
              });
          }

          this.pokemonService.getPokemons().subscribe((allPokemons) => {
            for (const otherPokemon of allPokemons) {
              if (
                otherPokemon.pre_evolution &&
                otherPokemon.pre_evolution === this.pokemon.pokedexid
              ) {
                this.evolutions.push(otherPokemon);
              }
            }
            for (const otherPokemon of allPokemons) {
              if (otherPokemon.pre_evolution) {
                for (const evolution of this.evolutions) {
                  if (otherPokemon.pre_evolution === evolution.pokedexid) {
                    this.postEvolutions.push(otherPokemon);
                  }
                }
              }
            }
          });
        });
    });
  }

  verifierConnexionTrainer(): void {
    this.isTrainerConnected = this.authService.isAuthenticated();
  }

  capturePokemon(pokemon: Pokemon): void {
    // Obtenez le dresseur connecté
    if (this.authService.isAuthenticated()) {
      const loggedInTrainerId = this.authService.getLoggedInTrainer()?.id;

      // Vérifiez si loggedInTrainerId est défini
      if (loggedInTrainerId !== undefined) {
        // Appelez le service de capture avec l'ID du Pokémon et du dresseur connecté
        this.pokemonService
          .capturePokemon(pokemon.pokedexid, loggedInTrainerId)
          .subscribe(
            () => {
            },
            (erreur) => {
             
            }
          );
      }
    }
  }
}
