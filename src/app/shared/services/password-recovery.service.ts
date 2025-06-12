import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {ForgotPasswordResponse, UserForgotPasswordDTO} from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private http = inject(HttpClient);

  sendPasswordResetRequest(dto: UserForgotPasswordDTO) {
    return this.http.post<ForgotPasswordResponse>(`${environment.BASE_URL}/auth/forget-password`, dto)
  }
}
