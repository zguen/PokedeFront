import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/services/auth.service';
import { Trainer } from 'src/app/models/trainer';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  isAdmin: boolean = false;
  isTrainerConnected: boolean = false;
  isAlreadyCaptured: boolean = false;

  @Input() pokemon!: Pokemon;
  preEvolution: Pokemon | undefined;
  prePreEvolution: Pokemon | undefined;
  evolutions: Pokemon[] = [];
  postEvolutions: Pokemon[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private masterService: MasterService,
    private authService: AuthService,
    private router: Router
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
          this.verifierCapturePokemon();
          // Efface les évolutions, les pré-évolutions et les pré-pré-évolutions précédentes
          this.evolutions = [];
          this.preEvolution = undefined;
          this.prePreEvolution = undefined;
          this.postEvolutions = []; // Réinitialise les post-évolutions

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

  verifierCapturePokemon(): void {
    if (this.isTrainerConnected && this.authService.getLoggedInTrainer()) {
      const loggedInTrainer = this.authService.getLoggedInTrainer();
      const isCaptured = loggedInTrainer!.pokemon?.some(
        (capturedPokemon) =>
          capturedPokemon.pokedexid === this.pokemon.pokedexid
      );
      this.isAlreadyCaptured = isCaptured || false;
    }
  }


  capturePokemon(pokemon: Pokemon): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    const loggedInTrainer = this.authService.getLoggedInTrainer();
    if (!loggedInTrainer || loggedInTrainer.id === undefined) {
      console.error('Dresseur non connecté ou ID non défini');
      return;
    }
    const loggedInTrainerId = loggedInTrainer.id;
    this.pokemonService
      .capturePokemon(pokemon.pokedexid, loggedInTrainerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.refreshCapturedPokemons(loggedInTrainer);
          this.router.navigate(['/master']);
        },
        error: (error) => {
          console.error('Erreur lors de la capture du Pokémon :', error);
        },
      });
  }
  private refreshCapturedPokemons(loggedInTrainer: Trainer): void {
    this.pokemonService
      .getPokemons()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (allPokemons) => {
          if (!loggedInTrainer.pokemon) {
            return;
          }
          const capturedPokemons = allPokemons.filter((pokemon) =>
            loggedInTrainer.pokemon!.some(
              (capturedPokemon) =>
                capturedPokemon.pokedexid === pokemon.pokedexid
            )
          );
          this.pokemonService.capturedPokemon$.next(capturedPokemons);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des Pokémon :', error);
        },
      });
  }

  bonjourModal() {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  }
  aurevoirModal() {
    const dialog = document.querySelector('dialog');
    dialog?.close();
  }
}
