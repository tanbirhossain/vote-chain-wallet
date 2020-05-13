import { LoginPrivate } from './../models/login-private';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { baseUrl } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class PrivateAccountService {

  constructor(private http: HttpClient) { }

  signInAccount(user: LoginPrivate) {
    const httpOptions = { headers: new HttpHeaders({'No-Auth': 'True' }) };
    return this.http.get(baseUrl + '/api/Profile/GetPublicKeyUser?privateKey=' + user.privateKey, httpOptions);
  }
  signoutAccount() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<"">(baseUrl + '/tokens/cancel', httpOptions);
  }
}
