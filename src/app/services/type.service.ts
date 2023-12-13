import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from '../models/type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(environment.api + '/type');
  }
}
