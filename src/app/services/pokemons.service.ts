import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

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
