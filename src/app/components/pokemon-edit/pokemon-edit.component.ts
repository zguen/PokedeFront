import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Generation } from 'src/app/models/generation';
import { Type } from 'src/app/models/type';
import { Pokemon } from 'src/app/models/pokemon';
import { TypeService } from 'src/app/services/type.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css'],
})
export class PokemonEditComponent implements OnInit {
  generation: Generation[] = [];
  selectedGeneration: number[] = [];
  types: Type[] = [];
  selectedTypes: Type[] = [];
  pokemon!: Pokemon;

  constructor(
    private pokemonService: PokemonsService,
    private router: Router,
    private typeService: TypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Réoriente vers 404 si pas admin
    if (sessionStorage.getItem('profilMaster') !== 'true') {
      this.router.navigate(['/**']);
    }

    // Récupère les informations du Pokémon à partir de votre service ou API
    const pokemonIdFromRoute = Number(
      this.route.snapshot.paramMap.get('pokedexid')
    );

    // Utilisez l'ID récupéré pour obtenir l'objet pokemon correspondant
    this.pokemonService.getPokemonById(pokemonIdFromRoute).subscribe((data) => {
      this.pokemon = data;
    });
    this.typeService.getTypes().subscribe((data) => {
      this.types = data;
    });
  }

  updatePokemon(
    pre_evolution: number,
    picture: string,
    types: Type[],
    description: string
  ) {
       if (!pre_evolution) {
      pre_evolution = this.pokemon.pre_evolution;
    }

    if (!picture) {
      picture = this.pokemon.picture;
    }

    if (types.length === 0) {
      types = this.pokemon.types;
    }

    if (!description) {
      description = this.pokemon.description;
    }

     let updatePokemon = {
       pre_evolution: pre_evolution,
       picture: picture,
       types: types,
       description: description,
     };
    // Appelez votre service
    this.pokemonService
      .updatePokemon(this.pokemon.pokedexid, updatePokemon)
      .subscribe(() => {
        this.router.navigate([`/pokemons`]);
      });
  }

  deletePokemon(Pokemon: Pokemon) {
    this.pokemonService.deletePokemon(Pokemon).subscribe({
      next: (response) => {
        this.router.navigate([`/pokemons`]);
      },
      error: (error) => {},
    });
  }
}
