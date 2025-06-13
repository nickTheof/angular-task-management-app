import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationFilterService} from '../../../../shared/services/pagination-filter.service';
import {UserService} from '../../../../shared/services/user.service';
import {UiCardResponsesService} from '../../../../shared/services/ui-card-responses.service';
import {TaskSortFields, UserSortFields} from '../../../../shared/interfaces/pagination-filter.interfaces';
import {HttpErrorResponse} from '@angular/common/http';
import {UserReadOnlyDTO} from '../../../../shared/interfaces/user.interfaces';
import {TaskService} from '../../../../shared/services/task.service';
import {TaskReadOnlyDTO} from '../../../../shared/interfaces/task.interfaces';

@Component({
  selector: 'app-admin-tasks',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})
export class AdminTasksComponent {
  paginationService = inject(PaginationFilterService);
  private taskService = inject(TaskService);
  private uiService = inject(UiCardResponsesService);

  tasks = this.taskService.tasks;

  sortByField: TaskSortFields = 'uuid';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  sortBy(field: TaskSortFields) {
    if (this.sortByField === field) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortByField = field;
      this.sortDirection = 'ASC';
    }

    this.paginationService.setSort(this.sortByField, this.sortDirection);
    this.loadData();
  }

  sortDirIcon(): string {
    return this.sortDirection === 'ASC' ? 'fas fa-arrow-up text-xs ml-1' : 'fas fa-arrow-down text-xs ml-1';
  }

  ngOnInit() {
    this.paginationService.setSize(20);
    this.paginationService.setSort(this.sortByField, this.sortDirection);
    this.loadData();
  }

  /**
   * Lifecycle hook: clears UI messages on component destroy
   */
  ngOnDestroy() {
    this.uiService.clearError();
    this.uiService.clearSuccess();
    this.paginationService.reset();
  }


  totalPages = 0;

  prevPage() {
    this.paginationService.prevPage();
    this.loadData();
  }

  nextPage() {
    this.paginationService.nextPage();
    this.loadData();
  }

  loadData() {
    this.taskService.getFilteredTasks(this.paginationService.getQuery()).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      }
    });
  }


  deleteTask(task: TaskReadOnlyDTO) {
    this.taskService.deleteTask(task).subscribe({
      next: (response) => {
        this.uiService.setSuccess(`Task with uuid ${task.uuid} deleted`);
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      },
      complete: () => {
        this.loadData();
      }
    })
  }
}
