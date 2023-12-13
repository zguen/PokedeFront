import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Generation } from '../models/generation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GenerationService {
  private baseApiUrl = environment.api;
  constructor(private http: HttpClient) {}

  getGenerations(): Observable<Generation[]> {
    return this.http.get<Generation[]>(`${this.baseApiUrl}/generation`);
  }
}
