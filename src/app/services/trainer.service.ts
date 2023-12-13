import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { LoginTrainer } from '../models/login-trainer';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseApiUrl = environment.api;

  constructor(private http: HttpClient) {}

  registerTrainer(data: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${this.baseApiUrl}/auth-trainer/register`,
      data
    );
  }

  loginTrainer(data: LoginTrainer): Observable<{ trainer: Trainer }> {
    return this.http.post<{ trainer: Trainer }>(
      `${this.baseApiUrl}/auth-trainer/login`,
      data
    );
  }

  getTrainer(idTrainer: number): Observable<Trainer> {
    const headers = this.setHeaders();
    return this.http.get<Trainer>(`${this.baseApiUrl}/trainer/${idTrainer}`, {
      headers,
    });
  }

  getTrainerConnected(): Observable<Trainer> {
    const headers = this.setHeaders();
    return this.http.get<Trainer>(`${this.baseApiUrl}/trainer`, { headers });
  }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }
}
