import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {TaskInsertDTO, TaskReadOnlyDTO} from '../interfaces/task.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);


  insertMyTask(dto: TaskInsertDTO) {
    return this.http.post<TaskReadOnlyDTO>(`${environment.BASE_URL}/users/me/tasks`, dto);
  }
}
