import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { Trainer } from 'src/app/models/trainer';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-page-trainer',
  templateUrl: './page-trainer.component.html',
  styleUrls: ['./page-trainer.component.css'],
})
export class PageTrainerComponent {
  capturedPokemons: Pokemon[] = [];
  trainer!: Trainer;
  trainerId!: string;

  tabTypes: string[] = [];
  tabGenerations: string[] = [];

  capturedPokemonsFilter: Pokemon[] = [];

  saveFilterTab = {
    type: ['a'],
    generation: [''],
    valeur: '',
    idValeur: '',
  };

  constructor(
    private pokemonService: PokemonsService,
    private route: ActivatedRoute,
    private trainerService: TrainerService
  ) {}

  public displayedPokemonCount: number = 20;
  public addDisplayedPokemon: number = 20;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustDisplayedPokemonCount(window.innerWidth);
  }

  ngOnInit(): void {
    this.adjustDisplayedPokemonCount(window.innerWidth);
    this.addAdjustDisplayedPokemon(window.innerWidth);

    this.route.params.subscribe((params) => {
      this.trainerId = params['id'];
      this.trainerService.getTrainer(+this.trainerId).subscribe((data) => {
        this.trainer = data;
      });
    });

    this.pokemonService.getPokemonsByTrainer(+this.trainerId).subscribe({
      next: (capturedPokemons) => {
        this.capturedPokemons = capturedPokemons;

        this.capturedPokemons.forEach((pokemon) => {
          pokemon.types.forEach((type) => {
            const tabAlreadyIn = this.tabTypes.some((t) => t === type.wording);
            if (!tabAlreadyIn) {
              this.tabTypes.push(type.wording);
            }
          });
        });

        this.tabGenerations = [
          ...new Set(
            this.capturedPokemons.map((pokemon) => pokemon.generation.wording)
          ),
        ];

        this.saveFilterTab = {
          type: this.tabTypes,
          generation: this.tabGenerations,
          valeur: '',
          idValeur: '',
        };

        this.saveFilter(this.saveFilterTab);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      },
    });
  }

  loadMorePokemon() {
    this.displayedPokemonCount += this.addDisplayedPokemon;
  }

  adjustDisplayedPokemonCount(screenWidth: number): void {
    if (screenWidth < 768) {
      this.displayedPokemonCount = 2;
    } else if (screenWidth < 1700) {
      this.displayedPokemonCount = 5;
    } else {
      this.displayedPokemonCount = 6;
    }
  }
  addAdjustDisplayedPokemon(screenWidth: number): void {
    if (screenWidth < 768) {
      this.addDisplayedPokemon = 2;
    } else if (screenWidth < 1700) {
      this.addDisplayedPokemon = 5;
    } else {
      this.addDisplayedPokemon = 6;
    }
  }

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.saveFilter(this.saveFilterTab);
  }

  onSearchId(idValue: string) {
    this.saveFilterTab.idValeur = idValue;
    this.saveFilter(this.saveFilterTab);
  }

  onFilterTypes(filterType: string[]) {
    this.saveFilterTab.type = [...filterType];
    this.saveFilter(this.saveFilterTab);
  }

  onFilterGeneration(filterGeneration: string[]) {
    this.saveFilterTab.generation = [...filterGeneration];
    this.saveFilter(this.saveFilterTab);
  }

  filterType(e: Pokemon): boolean {
    for (const element of e.types) {
      if (this.saveFilterTab.type.includes(element.wording)) {
        return true;
      }
    }
    return false;
  }

  filterGeneration(e: Pokemon): boolean {
    return (
      this.saveFilterTab.generation.length === 0 ||
      this.saveFilterTab.generation.includes(e.generation.wording)
    );
  }

  saveFilter(saveFilter: any) {
    if (
      this.saveFilterTab.type.length >= 1 ||
      this.saveFilterTab.valeur.length >= 1 ||
      this.saveFilterTab.generation.length >= 1
    ) {
      this.capturedPokemonsFilter = this.capturedPokemons.filter(
        (e) =>
          e.name
            .toLowerCase()
            .startsWith(this.saveFilterTab.valeur.toLocaleLowerCase()) &&
          e.pokedexid.toString().startsWith(this.saveFilterTab.idValeur) &&
          this.filterType(e) &&
          this.filterGeneration(e)
      );
    } else {
      // Si la valeur de recherche est vide, réinitialisez la liste filtrée pour afficher tous les Pokémon.
      this.capturedPokemonsFilter = [...this.capturedPokemons];
    }
  }
}
