import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class CapturedPokemonService {

  capturedPokemons: { [trainerId: number]: Pokemon[] } = {};

  constructor() {}

  addCapturedPokemon(trainerId: number, pokemon: Pokemon) {
    if (!this.capturedPokemons[trainerId]) {
      this.capturedPokemons[trainerId] = [];
    }
    this.capturedPokemons[trainerId].push(pokemon);
  }

  getCapturedPokemons(trainerId: number) {
    if (this.capturedPokemons[trainerId]) {
      return this.capturedPokemons[trainerId];
    }
    return [];
  }
  
}
