import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private jwtToken = '';
  username = '';
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.jwtToken = token;
      this.loggedIn.next(true);
    }
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  login(credentials: any) {
    return this.http.post<any>(`http://localhost:3000/login`, credentials).pipe(
      map((response) => {
        this.jwtToken = response.accessToken;
        this.username = response.user.username;
        this.loggedIn.next(true);
        localStorage.setItem('jwtToken', this.jwtToken);
        localStorage.setItem('username', this.username);
        return true;
      })
    );
  }

  register(credentials: any): Observable<boolean> {
    return this.http
      .post<any>(`http://localhost:3000/register`, credentials)
      .pipe(switchMap(() => this.login(credentials)));
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  get getJwtToken(): string {
    return this.jwtToken;
  }

  get getUsername(): string {
    return this.username;
  }

  logout() {
    this.jwtToken = '';
    this.loggedIn.next(false);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
  }
}
