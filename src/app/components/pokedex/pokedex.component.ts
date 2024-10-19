import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { NavigationService } from 'src/app/services/navigation.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  pokedexid: number | undefined;
  previousPokedexId: number | undefined;
  nextPokedexId: number | undefined;
  preEvolution: Pokemon | undefined;
  prePreEvolution: Pokemon | undefined;
  evolutions: Pokemon[] = [];
  postEvolutions: Pokemon[] = [];
  totalIterations: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pokemonIdFromRoute = Number(params.get('pokedexid'));
      this.previousPokedexId = pokemonIdFromRoute - 1;
      this.nextPokedexId = pokemonIdFromRoute + 1;
      this.pokemonService
        .getPokemonById(pokemonIdFromRoute)
        .subscribe((data) => {
          this.pokemon = data;
          this.pokedexid = data.pokedexid;

          this.evolutions = [];
          this.preEvolution = undefined;
          this.prePreEvolution = undefined;
          this.postEvolutions = []; // Réinitialise les post-évolutions

          if (this.pokemon.pre_evolution) {
            // Si le Pokémon a une pré-évolution:
            this.pokemonService
              .getPokemonById(this.pokemon.pre_evolution)
              .subscribe((preEvolution) => {
                this.preEvolution = preEvolution;

                if (this.preEvolution.pre_evolution) {
                  // Si la pré-évolution a elle-même une pré-évolution:
                  this.pokemonService
                    .getPokemonById(this.preEvolution.pre_evolution)
                    .subscribe((prePreEvolution) => {
                      this.prePreEvolution = prePreEvolution;
                    });
                }
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
    });
  }

  getPokemonItems(): any[] {
    const pokemonItems = [
      this.prePreEvolution,
      this.preEvolution,
      this.pokemon,
      ...this.evolutions,
      ...this.postEvolutions,
    ];
    // Filtrer les éléments nuls ou vides
    const filteredPokemonItems = pokemonItems.filter(
      (item) =>
        item !== null && item !== undefined && Object.keys(item).length > 0
    );
    const emptyItemCount = Math.max(10 - filteredPokemonItems.length, 0);
    const emptyItems = Array(emptyItemCount).fill({});
    return [...filteredPokemonItems, ...emptyItems];
  }

  emptyButtons(): number[] {
    const maxButtons = 10;
    const currentButtons =
      (this.prePreEvolution ? 1 : 0) +
      (this.preEvolution ? 1 : 0) +
      1 +
      this.evolutions.length +
      this.postEvolutions.length;

    return Array(Math.max(0, maxButtons - currentButtons)).fill(0);
  }

  goToPreviousPokemon(): void {
    this.pokemonService.getPokemons().subscribe((allPokemons) => {
      const lastPokedexId = Math.max(...allPokemons.map((p) => p.pokedexid)); // Obtenir le dernier pokedexId
      const targetPokedexId =
        this.previousPokedexId !== undefined && this.previousPokedexId > 0
          ? this.previousPokedexId
          : lastPokedexId; // Retour au dernier Pokémon si previousPokedexId est undefined ou <= 0

      this.router.navigate(['/pokedex', targetPokedexId]);
    });
  }

  goToNextPokemon(): void {
    this.pokemonService.getPokemons().subscribe((allPokemons) => {
      const lastPokedexId = Math.max(...allPokemons.map((p) => p.pokedexid)); // Obtenir le dernier pokedexId
      const targetPokedexId =
        this.nextPokedexId && this.nextPokedexId <= lastPokedexId
          ? this.nextPokedexId
          : 1; // Revenir au premier Pokémon si out of range

      this.router.navigate(['/pokedex', targetPokedexId]);
    });
  }

  back(): void {
    this.navigation.back();
  }
  goToSearchedPokemon(): void {
    if (
      this.pokedexid !== undefined &&
      this.pokedexid > 0 &&
      this.pokedexid < 1018
    ) {
      this.router.navigate(['/pokedex', this.pokedexid]);
    }
  }
}