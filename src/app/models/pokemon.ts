import { Generation } from './generation';
import { Type } from './type';

export interface Pokemon {
  pokedexid: number;
  name: string;
  picture: number;
  pre_evolution: number;
  height: string;
  weight: string;
  id_generation: number;
  generation: Generation;
  types: Type[];
}
