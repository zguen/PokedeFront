import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  previousPokedexId: number | undefined;
  nextPokedexId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pokemonIdFromRoute = Number(params.get('pokedexid'));
      this.previousPokedexId = pokemonIdFromRoute - 1;
      this.nextPokedexId = pokemonIdFromRoute + 1;
      this.pokemonService
        .getPokemonById(pokemonIdFromRoute)
        .subscribe((data) => {
          this.pokemon = data;
        });
    });
  }

  goToPreviousPokemon(): void {
    if (this.previousPokedexId !== undefined && this.previousPokedexId > 0) {
      this.router.navigate(['/pokedex', this.previousPokedexId]);
    } else {
      this.router.navigate(['/pokedex', this.pokemon.pokedexid]);
    }
  }

  goToNextPokemon(): void {
    if (this.nextPokedexId !== undefined && this.nextPokedexId <= 1017) {
      this.router.navigate(['/pokedex', this.nextPokedexId]);
    } else {
      this.router.navigate(['/pokedex', this.pokemon.pokedexid]);
    }
  }
}
