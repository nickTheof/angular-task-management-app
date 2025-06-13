import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {TaskInsertDTO, TaskReadOnlyDTO, TaskUpdateDTO} from '../interfaces/task.interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);


  insertMyTask(dto: TaskInsertDTO) {
    return this.http.post<TaskReadOnlyDTO>(`${environment.BASE_URL}/users/me/tasks`, dto);
  }

  updateMyTask(taskUuid: string, dto: TaskUpdateDTO): Observable<TaskReadOnlyDTO> {
    return this.http.patch<TaskReadOnlyDTO>(`${environment.BASE_URL}/users/me/tasks/${taskUuid}`, dto)
  }

  deleteMyTask(taskUuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}/users/me/tasks/${taskUuid}`);
  }
}
