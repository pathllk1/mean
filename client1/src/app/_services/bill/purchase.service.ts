import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stock } from '../../models/stock';
import { TokenStorageService } from '../token-storage.service';
import { Bills } from 'src/app/models/bills';

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

  add_bill(data: Bills): Observable<any> {
    return this.http.post(API_URL + "/save_bill", data, { responseType: 'text' });
  }
  
  list_reg(): Observable<any>{
    return this.http.post(API_URL + "/list_reg", {responseType: 'json'})
  }

  list_stc(): Observable<any>{
    return this.http.post(API_URL + "/list", {responseType: 'json'})
  }

  list_bill(): Observable<any>{
    return this.http.post(API_URL + "/list_bill", {responseType: 'json'})
  }

  get_item_by_name(item: string): Observable<any>{
    return this.http.post(API_URL + "/get_item_by_name", {item: item}, {responseType: 'json'})
  }
}