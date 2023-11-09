import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { MasterService } from 'src/app/services/master.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  isConnected = false;
  randomPokemon: Pokemon | null = null; // Utilisation d'un seul Pokémon au lieu d'un tableau

  constructor(
    private masterService: MasterService,
    private pokemonService: PokemonsService
  ) {}

  ngOnInit() {
    this.masterService.getMasterConnected().subscribe((master) => {
      this.isConnected = !!master;
    });

    this.getRandomPokemon(); // Modification ici
  }

  private getRandomPokemon() {
    this.pokemonService.getPokemons().subscribe((allPokemons) => {
      if (allPokemons && allPokemons.length > 0) {
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        this.randomPokemon = allPokemons[randomIndex];
      }
    });
  }
}
