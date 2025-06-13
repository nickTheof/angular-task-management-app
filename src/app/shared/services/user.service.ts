import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserReadOnlyDTO} from '../interfaces/user.interfaces';
import {Paginated, PaginationQuery} from '../interfaces/pagination-filter.interfaces';
import {environment} from '../../../environments/environment.development';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private _users = signal<UserReadOnlyDTO[]>([]);

  users = this._users.asReadonly();

  getFilteredUsers(filterObj: PaginationQuery) {
    return this.http.post<Paginated<UserReadOnlyDTO>>(`${environment.BASE_URL}/users/filtered`, filterObj)
    .pipe(tap(
      resp => {
        this._users.set(resp.data)
      }
    ))
  }

  deleteUser(user: UserReadOnlyDTO) {
    return this.http.delete<void>(`${environment.BASE_URL}/users/${user.uuid}`)
  }

  updateUserRole(user: UserReadOnlyDTO, role: String) {
    return this.http.patch<UserReadOnlyDTO>(`${environment.BASE_URL}/users/${user.uuid}`, {
      role: role
    })
  }

  updateUserStatus(user: UserReadOnlyDTO) {
    return this.http.patch<UserReadOnlyDTO>(`${environment.BASE_URL}/users/${user.uuid}`, {
      isActive: !user.isActive
    })
  }
}
