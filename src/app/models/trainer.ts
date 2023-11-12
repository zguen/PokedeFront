import { Pokemon } from "./pokemon";

export interface Trainer {
  id?: number;
  firstname: string;
  nickname: string;
  password: string;
  id_master?: number;
  pokemon?: Pokemon[];
}
