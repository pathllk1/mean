import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/.netlify/functions/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  get_users(): Observable<any> {
    return this.http.get(API_URL + 'get_all_user', { responseType: 'json' });
  }
}
