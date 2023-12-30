import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { environment } from 'src/environments/environment';
import { Capture } from '../models/capture';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CapturedPokemonService {
  private baseApiUrl = environment.api;
  capturedPokemons: { [trainerId: number]: Pokemon[] } = {};

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  addCapturedPokemon(trainerId: number, pokemon: Pokemon) {
    if (!this.capturedPokemons[trainerId]) {
      this.capturedPokemons[trainerId] = [];
    }
    this.capturedPokemons[trainerId].push(pokemon);
  }

  getCapturedPokemons(trainerId: number) {
    if (this.capturedPokemons[trainerId]) {
      return this.capturedPokemons[trainerId];
    }
    return [];
  }

  updateCapture(
    trainerId: number,
    pokemonId: number,
    capture: Capture
  ): Observable<Capture> {
    const headers = this.setHeaders();
    return this.http.patch<Capture>(
      `${this.baseApiUrl}/api/capture/${trainerId}/${pokemonId}`,
      capture,
      {
        headers,
      }
    );
  }
}
