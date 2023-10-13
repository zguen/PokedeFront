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
  pokemonsToDisplayFilter: Pokemon[] = [];
  saveFilterTab = {
    valeur: '',
  };

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe((pokemons) => {
      this.pokemonsToDisplay = pokemons;
      this.pokemonsToDisplayFilter = [...this.pokemonsToDisplay];
    });
  }

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.saveFilter(this.saveFilterTab);
  }

  saveFilter(saveFilter: any) {
    if (this.saveFilterTab.valeur.length >= 1) {
      this.pokemonsToDisplayFilter = this.pokemonsToDisplay.filter((e) =>
        e.name
          .toLowerCase()
          .includes(this.saveFilterTab.valeur.toLocaleLowerCase())
      );
    }
    console.log (this.pokemonsToDisplayFilter)
  }
}
