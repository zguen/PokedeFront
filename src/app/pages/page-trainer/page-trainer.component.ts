import { Component, HostListener } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-page-trainer',
  templateUrl: './page-trainer.component.html',
  styleUrls: ['./page-trainer.component.css'],
})
export class PageTrainerComponent {
  capturedPokemons: Pokemon[] = [];

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
    private authService: AuthService
  ) {}

  public displayedPokemonCount: number = 5; // Commencez avec les 5 premiers
  public addDisplayedPokemon: number = 5;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustDisplayedPokemonCount(window.innerWidth);
  }

  ngOnInit(): void {
    this.adjustDisplayedPokemonCount(window.innerWidth);
    this.addAdjustDisplayedPokemon(window.innerWidth);

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
        }

        // Nouvelles modifications
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
      },
      (error) => {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    );
  }

  public loadMorePokemon() {
    this.displayedPokemonCount += this.addDisplayedPokemon; // Ajoute a chaque clic
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
    for (let i = 0; i < e.types.length; i++) {
      if (this.saveFilterTab.type.includes(e.types[i].wording)) {
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
