import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';
import { CreatePokemon } from '../models/create-pokemon';
import { UpdatePokemon } from '../models/update-pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) { }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  createPokemon(pokemon: CreatePokemon): Observable<Pokemon> {
    const headers = this.setHeaders(); // Assurez-vous que la méthode setHeaders() est correcte pour votre application.
    return this.http.post<Pokemon>(
      `http://localhost:3000/api/pokemon`,
      pokemon,
      { headers }
    );
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('http://localhost:3000/api/pokemon');
  }

  getPokemonById(pokedexid: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `http://localhost:3000/api/pokemon/${pokedexid}`
    );
  }

  getPreEvolution(pokedexid: number): Observable<Pokemon> {
    // Utilisez l'ID de la pré-évolution pour obtenir les détails de la pré-évolution
    return this.http.get<Pokemon>(
      `http://localhost:3000/api/pokemon/${pokedexid}`
    );
  }

  updatePokemon(
    pokedexid: number,
    pokemon: UpdatePokemon
  ): Observable<Pokemon> {
    const headers = this.setHeaders();
    return this.http.patch<Pokemon>(
      `http://localhost:3000/api/pokemon/${pokedexid}`,
      pokemon,
      {
        headers,
      }
    );
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    // recup le token dans le sessionstorage
    const headers = this.setHeaders();
    return this.http.delete<Pokemon>(
      `http://localhost:3000/api/pokemon/${pokemon.pokedexid}`,
      { headers }
    );
  }

  capturePokemon(
    pokemonId: number,
    trainerId: number,
    nickname?: string,
    game?: string
  ): Observable<void> {
    const payload: any = {
      id_pokemon: pokemonId,
      id_trainer: trainerId,
    };

    // Ajoutez le nickname au payload s'il est défini
    if (nickname !== undefined) {
      payload.nickname = nickname;
    }

    // Ajoutez le game au payload s'il est défini
    if (game !== undefined) {
      payload.game = game;
    }

    // Envoyez la requête POST
    return this.http.post<void>(
      `http://localhost:3000/api/pokemon/capture`,
      payload
    );
  }
}
