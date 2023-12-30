import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable, Subject } from 'rxjs';
import { CreatePokemon } from '../models/create-pokemon';
import { UpdatePokemon } from '../models/update-pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private baseApiUrl = environment.api;
  capturedPokemon$ = new Subject<Pokemon[]>();

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  createPokemon(pokemon: CreatePokemon): Observable<Pokemon> {
    const headers = this.setHeaders(); // Assurez-vous que la méthode setHeaders() est correcte pour votre application.
    return this.http.post<Pokemon>(`${this.baseApiUrl}/pokemon`, pokemon, {
      headers,
    });
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseApiUrl}/pokemon`);
  }

  getPokemonById(pokedexid: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseApiUrl}/pokemon/${pokedexid}`);
  }

  getPreEvolution(pokedexid: number): Observable<Pokemon> {
    // Utilisez l'ID de la pré-évolution pour obtenir les détails de la pré-évolution
    return this.http.get<Pokemon>(
      `${this.baseApiUrl}/pokemon/${pokedexid}`
    );
  }

  updatePokemon(
    pokedexid: number,
    pokemon: UpdatePokemon
  ): Observable<Pokemon> {
    const headers = this.setHeaders();
    return this.http.patch<Pokemon>(
      `${this.baseApiUrl}/pokemon/${pokedexid}`,
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
      `${this.baseApiUrl}/pokemon/${pokemon.pokedexid}`,
      { headers }
    );
  }

  capturePokemon(
    pokemonId: number,
    trainerId: number,
    game?: string
  ): Observable<void> {
    const payload: any = {
      id_pokemon: pokemonId,
      id_trainer: trainerId,
    };

    // Ajoutez le game au payload s'il est défini
    if (game !== undefined) {
      payload.game = game;
    }

    // Envoyez la requête POST
    return this.http.post<void>(
      `${this.baseApiUrl}/pokemon/capture`,
      payload
    );
  }

  getPokemonsByTrainer(trainerId: number): Observable<Pokemon[]> {
    const url = `${this.baseApiUrl}/pokemon/by-trainer/${trainerId}`;
    return this.http.get<Pokemon[]>(url);
  }
}
