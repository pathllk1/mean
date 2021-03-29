import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exp } from '../models/exp';

const API_URL = '/.netlify/functions/api/exp';

@Injectable({
  providedIn: 'root'
})
export class ExpService {
  constructor(private http: HttpClient) { }

  add_exp(data: Exp): Observable<any> {
    return this.http.post(API_URL, data, { responseType: 'json' });
  }

  list_all(): Observable<any> {
    return this.http.get(API_URL + '/list_all', { responseType: 'json' });
  }

  update_exp(data: Exp): Observable<any> {
    return this.http.post(API_URL + '/edit', data, { responseType: 'json' });
  }
}
