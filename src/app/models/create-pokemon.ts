import { Type } from './type';

export interface CreatePokemon {
  pokedexid: number;
  name: string;
  picture: string;
  pre_evolution: number;
  height: string;
  weight: string;
  id_generation: number;
  types: Type[];
  description: string;
}
