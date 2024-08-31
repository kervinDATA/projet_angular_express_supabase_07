import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegister = 'http://localhost:3000/api/auth/register';
  private apiUrlLogin = 'http://localhost:3000/api/auth/login';

  private userSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('username');
    console.log('Stored username in constructor:', storedUsername);
    this.userSubject.next(storedUsername); // Mettre à jour le BehaviorSubject
  }

  register(userData: { username: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const username = response.username || null;
          this.userSubject.next(username);
          localStorage.setItem('username', username || ''); // Assurez-vous que le nom d'utilisateur est bien stocké
        } else {
          console.warn('Login response did not contain expected data');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    console.log('User logged out');
  }
}
