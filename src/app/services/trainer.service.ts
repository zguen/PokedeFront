import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { LoginTrainer } from '../models/login-trainer';
import { LoginAnswer } from '../models/login-answer';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  registerTrainer(data: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      `${this.baseApiUrl}/auth-trainer/register`,
      data
    );
  }

  loginTrainer(data: LoginTrainer): Observable<LoginAnswer> {
    return this.http.post<LoginAnswer>(`${this.baseApiUrl}/auth-trainer/login`, data);
  }

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
