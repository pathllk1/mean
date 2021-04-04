import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../../models/stock';
import { TokenStorageService } from '../token-storage.service';

const API_URL = '/.netlify/functions/api/purc';
@Injectable({
  providedIn: 'root'
})


export class PurchaseService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
   
  }

  add_stc_reg(data: Stock): Observable<any> {
    return this.http.post(API_URL + "/save", data, { responseType: 'text' });
  }
  
  list_reg(): Observable<any>{
    return this.http.post(API_URL + "/list_reg", {responseType: 'json'})
  }
}