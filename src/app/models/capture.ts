import { Game } from "./game";

export interface Capture {
    id_trainer: number,
    id_pokemon: number,
    games: Game[]
}