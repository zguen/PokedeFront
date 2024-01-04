import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { environment } from 'src/environments/environment';
import { updateCapture } from '../models/update-capture';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capture } from '../models/capture';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class CapturedPokemonService {
  private baseApiUrl = environment.api;
  capturedPokemons: { [trainerId: number]: Pokemon[] } = {};
  isAlreadyCaptured$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  checkCaptureStatus(trainerId: number, pokemonId: number): void {
    const url = `${this.baseApiUrl}/capture/is-captured/${trainerId}/${pokemonId}`;

    this.http.get<{ captured: boolean }>(url).subscribe({
      next: (response) => {
        this.isAlreadyCaptured$.next(response.captured);
      },
      error: (error) => {
        console.error('Error checking capture status:', error);
      },
    });
  }

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
    capture: updateCapture
  ): Observable<Capture> {
    const headers = this.setHeaders();
    return this.http.patch<Capture>(
      `${this.baseApiUrl}/capture/${trainerId}/${pokemonId}`,
      capture,
      {
        headers,
      }
    );
  }
}
