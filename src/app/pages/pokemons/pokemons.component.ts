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

  pokemonsToDisplayFilter: Pokemon[] = [];

  saveFilterTab = {
    type: ['a'],
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
            this.tabTypes.push(type.wording)
          }
        });
      });
    });
  }

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.saveFilter(this.saveFilterTab);
  }

  onFilterTypes(filterType: string[]) {
    this.saveFilterTab.type = [...filterType];
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

  saveFilter(saveFilter: any) {
    if (
      this.saveFilterTab.valeur.length >= 1 ||
      this.saveFilterTab.type.length >= 1
    ) {
      this.pokemonsToDisplayFilter = this.pokemonsToDisplay
        .filter((e) =>
          e.name
            .toLowerCase()
            .startsWith(this.saveFilterTab.valeur.toLocaleLowerCase())
        )
        .filter((e) => this.filterType(e));
    } else {
      // Si la valeur de recherche est vide, réinitialisez la liste filtrée pour afficher tous les Pokémon.
      this.pokemonsToDisplayFilter = [...this.pokemonsToDisplay];
    }
    console.log(this.pokemonsToDisplayFilter);
  }
}
