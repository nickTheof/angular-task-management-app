import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken, LoggedInUser, LoginResponse} from '../interfaces/auth.interfaces';
import {LoginUserDTO} from '../interfaces/user.interfaces';
import {tap} from 'rxjs';
import {environment} from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _token = signal<string | null>(localStorage.getItem("access_token"));
  readonly token = this._token.asReadonly();

  user = computed((): LoggedInUser | null => {
    const token = this._token();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      return {
        sub: decoded.sub,
        role: decoded.role,
      }
    }
    return null;
  })

  tokenExpired = computed(() => {
    const token = this._token();
    if (token) {
      return this.isTokenExpired(token);
    }
    return false;
  })

  login(dto: LoginUserDTO) {
    return this.http.post<LoginResponse>(
      `${environment.BASE_URL}/auth/login`,
          dto
    ).pipe(
      tap(res => {
        this._token.set(res.token);
        localStorage.setItem("access_token", res.token);
      })
    )
  }

  logout() {
    this.clearCredentials();
    this.router.navigate(['/'], {
      replaceUrl: true
    });
  }

  clearCredentials() {
    localStorage.removeItem("access_token");
    this._token.set(null);
  }

  isAdmin(): boolean {
    return this.user()?.role === "ADMIN";
  }

  isTokenExpired(token: string | null): boolean {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 < Date.now();
    } else {
      return false;
    }
  }
}
