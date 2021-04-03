import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exp } from '../models/exp';
import { TokenStorageService } from './token-storage.service';

const API_URL = '/.netlify/functions/api/exp';

@Injectable({
  providedIn: 'root'
})
export class ExpService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  add_exp(data: Exp): Observable<any> {
    return this.http.post(API_URL, data, { responseType: 'json' });
  }

  list_all(): Observable<any> {
    return this.http.post(API_URL + '/list', {firm: this.tokenStorageService.getUser().firm}, { responseType: 'json' });
  }

  update_exp(data: Exp): Observable<any> {
    return this.http.post(API_URL + '/edit', data, { responseType: 'json' });
  }

  del_exp(id: string): Observable<any>{
    return this.http.post(API_URL + "/del", {id: id}, {responseType: 'json'})
  }
}
