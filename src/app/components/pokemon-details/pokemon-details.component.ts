import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon!: Pokemon;
  preEvolution!: Pokemon;
  prePreEvolution!: Pokemon;
  evolutions: Pokemon[] = [];
  postEvolutions: Pokemon[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pokemonIdFromRoute = Number(
      this.route.snapshot.paramMap.get('pokedexid')
    );

    this.pokemonService.getPokemonById(pokemonIdFromRoute).subscribe((data) => {
      this.pokemon = data;

      if (this.pokemon.pre_evolution) {
        // Si le Pokémon a une pré-évolution, récupérez les détails de la pré-évolution
        this.pokemonService
          .getPokemonById(this.pokemon.pre_evolution)
          .subscribe((preEvolution) => {
            this.preEvolution = preEvolution;

            if (this.preEvolution.pre_evolution) {
              // Si la pré-évolution a elle-même une pré-évolution, vous pouvez ajouter un traitement ici.

              this.pokemonService
                .getPokemonById(this.preEvolution.pre_evolution)
                .subscribe((prePreEvolution) => {
                  this.prePreEvolution = prePreEvolution;
                });
            }
            console.log(preEvolution.pokedexid);
          });
      }
      this.pokemonService.getPokemons().subscribe((allPokemons) => {
        for (const otherPokemon of allPokemons) {
          if (
            otherPokemon.pre_evolution &&
            otherPokemon.pre_evolution === this.pokemon.pokedexid
          ) {
            this.evolutions.push(otherPokemon);
          }
        }
        for (const otherPokemon of allPokemons) {
          if (otherPokemon.pre_evolution) {
            for (const evolution of this.evolutions) {
              if (otherPokemon.pre_evolution === evolution.pokedexid) {
                this.postEvolutions.push(otherPokemon);
              }
            }
          }
        }
      });
    });
  }
}
