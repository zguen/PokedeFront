import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  randomPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit() {
    this.getRandomPokemon();
  }

  private getRandomPokemon() {
    this.pokemonService.getPokemons().subscribe((allPokemons) => {
      if (allPokemons && allPokemons.length > 0) {
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        this.randomPokemon = allPokemons[randomIndex];
      }
    });
  }
  generateRandomPokemon() {
    this.getRandomPokemon();
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
