import { Pokemon } from "./pokemon";

export interface Trainer {
  id?: number;
  nickname: string;
  password: string;
  password_confirm?: string;
  id_master?: number;
  pokemon?: Pokemon[];
}
