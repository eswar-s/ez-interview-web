import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(): Observable<boolean> {
    let isAuthenticated = Math.floor((Math.random() * 100) + 1)%2 === 0;
    this.isLoggedIn = isAuthenticated;
    return Observable.of(isAuthenticated).delay(1000).do(val => this.isLoggedIn = val);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
