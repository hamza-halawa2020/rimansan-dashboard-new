import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../store/models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user!: User;
  currentUserValue: any;
  afAuth: any;
  private currentUserSubject: BehaviorSubject<User>;
  private apiUrl = environment.backEndUrl;

  constructor(
    private cookieService: CookieService,

    private http: HttpClient,
    private store: Store
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
  }

  login(userData: any) {
    return this.http.post(`${this.apiUrl}/admin-login`, userData, {
      withCredentials: false,
    });
  }

  setTokenInCookie(token: string) {
    const options = {
      expires: 1,
      secure: true,
      sameSite: 'Strict' as 'Strict',
      path: '/',
    };

    this.cookieService.set('token', token, options);
  }

  isLoggedIn() {
    return this.getTokenFromCookie();
  }

  getTokenFromCookie(): any {
    return this.cookieService.get('token');
  }

  logout(): Observable<void> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null!);

    return of(undefined).pipe(tap(() => {}));
  }
}
