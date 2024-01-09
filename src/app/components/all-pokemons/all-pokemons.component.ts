import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css'],
})
export class AllPokemonsComponent implements OnInit {
  @Input() allPokemons!: Pokemon[];

  public displayedPokemonCount: number = 50; // Commence avec les premiers
  public addDisplayedPokemon: number = 50;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustDisplayedPokemonCount(window.innerWidth);
  }

  ngOnInit(): void {
    // Initialiser le nombre de Pokémon à afficher en fonction de la largeur d'écran actuelle
    this.adjustDisplayedPokemonCount(window.innerWidth);
    this.addAdjustDisplayedPokemon(window.innerWidth);
  }
  public loadMorePokemon() {
    this.displayedPokemonCount += this.addDisplayedPokemon; // Ajoute a chaque clic
  }

  adjustDisplayedPokemonCount(screenWidth: number): void {
    if (screenWidth < 768) {
      this.displayedPokemonCount = 40;
    } else if (screenWidth < 1700) {
      this.displayedPokemonCount = 50;
    } else {
      this.displayedPokemonCount = 60;
    }
  }
  addAdjustDisplayedPokemon(screenWidth: number): void {
    if (screenWidth < 768) {
      this.addDisplayedPokemon = 40;
    } else if (screenWidth < 1700) {
      this.addDisplayedPokemon = 50;
    } else {
      this.addDisplayedPokemon = 60;
    }
  }
}
