import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Generation } from 'src/app/models/generation';
import { Type } from 'src/app/models/type';
import { GenerationService } from 'src/app/services/generation.service';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-pokemon-add',
  templateUrl: './pokemon-add.component.html',
  styleUrls: ['./pokemon-add.component.css'],
})
export class PokemonAddComponent implements OnInit {
  generation: Generation[] = [];
  selectedGeneration: number[] = [];
  types: Type[] = [];
  selectedTypes: Type[] = [];

  constructor(
    private pokemonService: PokemonsService,
    private router: Router,
    private generationService: GenerationService,
    private typeService: TypeService
  ) {}

  ngOnInit() {
    //réoriente vers 404 si pas admin
    if (sessionStorage.getItem('profilMaster') != 'true') {
      this.router.navigate(['/**']);
    }

    this.generationService.getGenerations().subscribe((data) => {
      this.generation = data;
    });
    this.typeService.getTypes().subscribe((data) => {
      this.types = data;
    });
  }

  createPokemon(
    pokedexid: number,
    name: string,
    picture: string,
    pre_evolution: number,
    height: string,
    weight: string,
    generationId: number[],
    types: Type[],
    description: string
  ) {
    let newPokemon = {
      pokedexid,
      name,
      picture,
      pre_evolution,
      height,
      weight,
      id_generation: generationId[0],
      types,
      description,
    };
    if (
      !pokedexid ||
      !this.selectedGeneration ||
      !name ||
      this.selectedTypes.length === 0 || this.selectedTypes.length > 2
    ) {
      alert(`Merci de renseigner les champs vides`);
    } else {
      this.pokemonService.createPokemon(newPokemon).subscribe(() => {
        this.router.navigate([`/pokemons`]);
      });
    }
  }
}
