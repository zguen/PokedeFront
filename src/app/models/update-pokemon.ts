import { Type } from './type';

export interface UpdatePokemon {
  pre_evolution?: number;
  picture?: string;
  types?: Type[];
  description?: string;
}
