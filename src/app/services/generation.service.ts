import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Generation } from '../models/generation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerationService {
  constructor(private http: HttpClient) {}

  getGenerations(): Observable<Generation[]> {
    return this.http.get<Generation[]>('http://localhost:3000/api/generation');
  }
}
