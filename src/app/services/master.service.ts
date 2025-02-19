import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginMaster } from '../models/login-master';
import { LoginAnswer } from '../models/login-answer';
import { Master } from '../models/master';
import { Trainer } from '../models/trainer';
import { environment } from 'src/environments/environment';
import { ResetToken } from '../models/reset-token';
import { UpdateMaster } from '../models/update-master';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseApiUrl = environment.api;

  public isLog$: BehaviorSubject<boolean>;

  addedTrainer$ = new Subject<Trainer[]>();

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isLog$ = new BehaviorSubject(true);
    } else {
      this.isLog$ = new BehaviorSubject(false);
    }
  }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  registerMaster(data: Master): Observable<Master> {
    return this.http.post<Master>(`${this.baseApiUrl}/auth/register`, data);
  }

  loginMaster(data: LoginMaster): Observable<LoginAnswer> {
    return this.http.post<LoginAnswer>(`${this.baseApiUrl}/auth/login`, data);
  }

  getMaster(idMaster: number): Observable<Master> {
    const headers = this.setHeaders();
    return this.http.get<Master>(`${this.baseApiUrl}/master/${idMaster}`, {
      headers,
    });
  }

  getMasterProfil(): Observable<Master> {
    const headers = this.setHeaders();
    return this.http.get<Master>(`${this.baseApiUrl}/master`, { headers }).pipe(
      tap((master: Master) => {
        sessionStorage.setItem('profilMaster', master.admin.toString());
      })
    );
  }

  addTrainerByMaster(trainer: Trainer): Observable<Master> {
    const headers = this.setHeaders();

    return this.http.post<Master>(
      `${this.baseApiUrl}/auth-trainer/register`,
      trainer,
      {
        headers,
      }
    );
  }
  envoyerMail(email: string): Observable<ResetToken> {
    return this.http.post<ResetToken>(`${this.baseApiUrl}/auth/reset-token`, {
      email,
    });
  }

  resetPassword(resetToken: string, master: UpdateMaster): Observable<Master> {
    const headers = this.setHeaders();
    return this.http.patch<Master>(
      `${this.baseApiUrl}/auth/${resetToken}`,
      master,
      {
        headers,
      }
    );
  }
}
