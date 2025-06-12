import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {RegisterUserDTO} from '../interfaces/user.interfaces';
import type {RegisterUserResponse} from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private http = inject(HttpClient);

  registerUser(dto: RegisterUserDTO) {
    return this.http.post<RegisterUserResponse>(`${environment.BASE_URL}/auth/register`, dto)
  }
}
