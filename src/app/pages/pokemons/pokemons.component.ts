import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent {
  pokemonsToDisplay: Pokemon[] = [];

  tabTypes: string[] = [];
  tabGenerations: string[] = [];

  pokemonsToDisplayFilter: Pokemon[] = [];

  saveFilterTab = {
    type: ['a'],
    generation: [''],
    valeur: '',
  };

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe((pokemons) => {
      this.pokemonsToDisplay = pokemons;
      this.pokemonsToDisplayFilter = [...this.pokemonsToDisplay];

      //initialise types tab
      this.pokemonsToDisplay.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
          const tabAlreadyIn = this.tabTypes.some((t) => t === type.wording);
          if (!tabAlreadyIn) {
            this.tabTypes.push(type.wording);
          }
        });
      });

      this.tabGenerations = [
        ...new Set(
          this.pokemonsToDisplay.map((pokemon) => pokemon.generation.wording)
        ),
      ];

      this.saveFilterTab = {
        type: this.tabTypes,
        generation: this.tabGenerations,
        valeur: '',
      };
    });
  }

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.saveFilter(this.saveFilterTab);

    console.log(value);
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
      this.pokemonsToDisplayFilter = this.pokemonsToDisplay
        .filter((e) =>
          e.name
            .toLowerCase()
            .startsWith(this.saveFilterTab.valeur.toLocaleLowerCase())
        )
        .filter((e) => this.filterType(e))
        .filter((e) => this.filterGeneration(e));
    } else {
      // Si la valeur de recherche est vide, réinitialisez la liste filtrée pour afficher tous les Pokémon.
      this.pokemonsToDisplayFilter = [...this.pokemonsToDisplay];
    }
    console.log(this.pokemonsToDisplayFilter);
  }
}
