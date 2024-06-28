import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('jwtToken'));
  private jwtToken = '';
  private username = new BehaviorSubject<string>(localStorage.getItem('username') || '');

  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.jwtToken = token;
      this.loggedIn.next(true);
    }
  }

  login(credentials: any): Observable<boolean> {
    return this.http.post<any>(`http://localhost:3000/login`, credentials).pipe(
      map((response) => {
        this.jwtToken = response.accessToken;
        const username = response.user.username;
        this.loggedIn.next(true);
        this.username.next(username);
        localStorage.setItem('jwtToken', this.jwtToken);
        localStorage.setItem('username', username);
        return true;
      })
    );
  }

  register(credentials: any): Observable<boolean> {
    return this.http.post<any>(`http://localhost:3000/register`, credentials).pipe(
      switchMap(() => this.login(credentials))
    );
  }

  get getJwtToken(): string {
    return this.jwtToken;
  }

  logout(): void {
    this.jwtToken = '';
    this.loggedIn.next(false);
    this.username.next('');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
  }
}
