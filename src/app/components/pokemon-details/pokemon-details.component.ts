import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit{
  
  pokemons!: Pokemon;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonsService) { }
  
  ngOnInit(): void {

    const pokemonIdFromRoute = Number(this.route.snapshot.paramMap.get('pokedexid'));
    this.pokemonService.getPokemonById(pokemonIdFromRoute).subscribe((data) => {
      this.pokemons = data;
    });
    }
  }



