import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTrainer(idTrainer: number): Observable<Trainer> {
    const headers = this.setHeaders();
    return this.http.get<Trainer>(`${this.baseApiUrl}/trainer/${idTrainer}`, {
      headers,
    });
  }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }
}
