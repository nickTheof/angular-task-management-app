import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {
  ForgotPasswordResponse,
  ResetPasswordDTO,
  ResetPasswordResponse,
  UserForgotPasswordDTO
} from '../interfaces/user.interfaces';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private http = inject(HttpClient);
  private router = inject(Router);

  sendForgetPasswordRequest(dto: UserForgotPasswordDTO) {
    return this.http.post<ForgotPasswordResponse>(`${environment.BASE_URL}/auth/forget-password`, dto)
  }

  sendResetPasswordRequest(dto: ResetPasswordDTO) {
    return this.http.post<ResetPasswordResponse>(`${environment.BASE_URL}/auth/reset-password`, dto)
      .pipe(finalize(() => {
      this.router.navigate(['/auth/login'], {
        replaceUrl: true
      });
    }))
  }
}
