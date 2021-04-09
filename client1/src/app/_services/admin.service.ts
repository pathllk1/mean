import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const API_URL = '/.netlify/functions/api/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  get_users(): Observable<any> {
    return this.http.get(API_URL + 'get_all_user', { responseType: 'json' });
  }

  send_sms(to: string, frm: string, msg: string): Observable<any> {
    return this.http.post(API_URL + 'send_sms', { to, frm, msg }, httpOptions);
  }

  getFbExp() {
    return this.firestore.collection('EXP').snapshotChanges();
  }
}
