import { Component, Input, OnInit, getModuleFactory } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/services/auth.service';
import { Game } from 'src/app/models/game';
import { CapturedPokemonService } from 'src/app/services/captured-pokemon.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Capture } from 'src/app/models/capture';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  isAdmin: boolean = false;
  isTrainerConnected: boolean = false;
  isPokemonCaptured: boolean = false; // Nouvelle variable

  @Input() pokemon!: Pokemon;
  @Input() captures!: Capture;
  capture!: Capture;
  preEvolution: Pokemon | undefined;
  prePreEvolution: Pokemon | undefined;
  evolutions: Pokemon[] = [];
  games: Game[] = [];
  selectedGames: Game[] = [];
  postEvolutions: Pokemon[] = [];
  private unsubscribe$ = new Subject<void>();
  isAlreadyCaptured$ = new BehaviorSubject<boolean>(false);

  blockSelect: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private masterService: MasterService,
    private authService: AuthService,
    private capturedPokemonService: CapturedPokemonService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.masterService.getMasterProfil().subscribe((master) => {
      this.isAdmin = master.admin;
    });
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  
    this.route.paramMap.subscribe((params) => {
      const pokemonIdFromRoute = Number(params.get('pokedexid'));
      this.pokemonService
        .getPokemonById(pokemonIdFromRoute)
        .subscribe((data) => {
          this.pokemon = data;

          this.verifierConnexionTrainer();
          this.pokemonService.getGamesByPokemonId(this.pokemon.pokedexid).subscribe((games) => {
            this.selectedGames = games;
          });
          
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

          if (this.authService.isAuthenticated()) {
            const loggedInTrainer = this.authService.getLoggedInTrainer();
            if (loggedInTrainer && loggedInTrainer.id !== undefined) {
              this.capturedPokemonService.checkCaptureStatus(
                loggedInTrainer.id,
                this.pokemon.pokedexid
              );

              // Souscrire au BehaviorSubject
              this.capturedPokemonService.isAlreadyCaptured$.subscribe(
                (captured) => {
                  this.isPokemonCaptured = captured;
                }
              );
            }
          }
        });
    });
  }

  verifierConnexionTrainer(): void {
    this.isTrainerConnected = this.authService.isAuthenticated();
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
          this.router.navigate(['/master']);
        },
        error: (error) => {
          console.error('Erreur lors de la capture du Pokémon :', error);
        },
      });
  }

  updateCapture(games: Game[]) {
    if (games.length === 0) {
      games = this.capture.games;
    }
    const loggedInTrainer = this.authService.getLoggedInTrainer();
    if (!loggedInTrainer || loggedInTrainer.id === undefined) {
      console.error('Dresseur non connecté ou ID non défini');
      return;
    }

    const trainerId = loggedInTrainer.id;
    const pokemonId = this.pokemon.pokedexid;

    let updateCapture = {
      games: games,
    };
    this.capturedPokemonService
      .updateCapture(trainerId, pokemonId, updateCapture)
      .subscribe({
        next: (capture) => {
          this.router.navigate([`/master`]);
        },
        error: (error) => {
          console.error('Error updating capture:', error);
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

  selectionnerJeuxModal() {
    const selectionnerJeuxDialog = document.querySelector(
      '#selectionnerJeuxModal'
    ) as HTMLDialogElement;
    selectionnerJeuxDialog?.showModal();
  }

  fermerSelectionnerJeuxModal() {
    const selectionnerJeuxDialog = document.querySelector(
      '#selectionnerJeuxModal'
    ) as HTMLDialogElement;
    selectionnerJeuxDialog?.close();
  }


}
