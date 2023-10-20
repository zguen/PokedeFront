import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css'],
})
export class AllPokemonsComponent implements OnInit {
  @Input() allPokemons!: Pokemon[];

  public displayedPokemonCount: number = 8; // Commencez avec les 20 premiers

  public loadMorePokemon() {
    this.displayedPokemonCount += 8; // Par exemple, ajoutez 20 de plus à chaque clic sur le bouton
  }

  ngOnInit(): void {}
}
