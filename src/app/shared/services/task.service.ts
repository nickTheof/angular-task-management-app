import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {
  PaginatedFilteredTasks,
  TaskFiltersDTO,
  TaskInsertDTO,
  TaskReadOnlyDTO,
  TaskUpdateDTO
} from '../interfaces/task.interfaces';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  private _tasks = signal<TaskReadOnlyDTO[]>([])
  readonly tasks = this._tasks.asReadonly();

  getUserPaginatedFilteredTasks(filters: TaskFiltersDTO) {
    return this.http.post<PaginatedFilteredTasks>(`${environment.BASE_URL}/users/me/tasks/filtered`, filters)
    .pipe(
      tap(tasks => {
        this._tasks.set(tasks.data)
      })
    )

  }


  insertMyTask(dto: TaskInsertDTO): Observable<TaskReadOnlyDTO> {
    return this.http.post<TaskReadOnlyDTO>(`${environment.BASE_URL}/users/me/tasks`, dto);
  }

  updateMyTask(taskUuid: string, dto: TaskUpdateDTO): Observable<TaskReadOnlyDTO> {
    return this.http.patch<TaskReadOnlyDTO>(`${environment.BASE_URL}/users/me/tasks/${taskUuid}`, dto)
  }

  deleteMyTask(taskUuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}/users/me/tasks/${taskUuid}`);
  }
}
