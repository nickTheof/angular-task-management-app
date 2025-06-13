import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import { CardResponsesComponent } from '../../ui/card-responses/card-responses.component';
import { UiCardResponsesService } from '../../../shared/services/ui-card-responses.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskStatus } from '../../../shared/interfaces/task.interfaces';
import { statuses } from '../../../shared/utils/task-status';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../shared/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import {PaginationFilterService} from '../../../shared/services/pagination-filter.service';
import {TaskFilters, TaskSortFields} from '../../../shared/interfaces/pagination-filter.interfaces';
import {TASK_SORT_FIELDS} from '../../../shared/interfaces/pagination-filter.interfaces';

@Component({
  selector: 'app-tasks',
  imports: [CardResponsesComponent, TaskCardComponent, TitleCasePipe, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {

  // Injected services
  private uiService = inject(UiCardResponsesService);
  private taskService = inject(TaskService);
  paginationService = inject(PaginationFilterService);


  // Observable readable signal for the fetched tasks
  tasks = this.taskService.tasks;

  // Computed signal for checking the taskStatus filters
  areFiltersEmpty = computed(() => {
    const filters = this.paginationService.filters() as TaskFilters;
    return !filters.taskStatus || filters.taskStatus.length === 0;
  });

  sortFields = TASK_SORT_FIELDS;
  totalPages = 0;

  // Available task status filter options
  statusOptions = statuses;

  /**
   * Lifecycle hook: initializes task loading on component mount
   */
  ngOnInit(): void {
    this.paginationService.setSize(9)
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

  /**
   * Navigates to the previous page and reloads tasks
   */
  prevPage() {
    this.paginationService.prevPage();
    this.loadData();
  }

  /**
   * Navigates to the next page and reloads tasks
   */
  nextPage() {
    this.paginationService.nextPage();
    this.loadData();
  }

  /**
   * Adds or removes a task status from the selected filters
   * Triggers data reload
   */
  toggleStatusFilter(status: TaskStatus) {
    const taskFilters = this.paginationService.filters() as TaskFilters;
    const currentStatuses = taskFilters.taskStatus || [];
    const updated = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];

    this.paginationService.updateFilters({ taskStatus: updated });
    this.loadData();
  }

  /**
   * Checks whether a status is currently selected
   */
  isStatusSelected(status: TaskStatus) {
    const taskFilters = this.paginationService.filters() as TaskFilters;
    return taskFilters.taskStatus?.includes(status) ?? false;
  }

  /**
   * Clears all active filters and reloads tasks
   */
  clearFilters() {
    this.paginationService.clearFilters();
    this.loadData();
  }

  /**
   * Called when the sort field is changed
   */
  onSortChange(field: TaskSortFields) {
    this.paginationService.setSort(field, this.paginationService.sortDir());
    this.loadData();
  }

  /**
   * Called when the page size is changed
   */
  onPageSizeChange(size: number){
    this.paginationService.setSize(size);
    this.paginationService.setPage(0);
    this.loadData();
  }

  /**
   * Called when the sort Direction is changed
   */
  toggleSortDir() {
    const dir = this.paginationService.sortDir() === 'ASC' ? 'DESC' : 'ASC';
    this.paginationService.setSort(this.paginationService.sortBy(), dir)
    this.loadData();
  }

  /**
   * Fetches paginated and filtered tasks from the service
   */
  loadData() {
    this.taskService.getUserPaginatedFilteredTasks(this.paginationService.getQuery()).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      }
    });
  }

}
