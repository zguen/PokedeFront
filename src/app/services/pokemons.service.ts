import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';
import { CreatePokemon } from '../models/create-pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
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
}
