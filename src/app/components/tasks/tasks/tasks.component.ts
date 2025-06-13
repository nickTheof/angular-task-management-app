import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CardResponsesComponent } from '../../ui/card-responses/card-responses.component';
import { UiCardResponsesService } from '../../../shared/services/ui-card-responses.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFiltersDTO, TaskSortFieldLabels, TaskStatus } from '../../../shared/interfaces/task.interfaces';
import { statuses } from '../../../shared/utils/task-status';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../shared/services/task.service';
import { TaskSortFields, OrderByFields } from '../../../shared/interfaces/task.interfaces';
import { HttpErrorResponse } from '@angular/common/http';

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

  // Observable signal for the fetched tasks
  tasks = this.taskService.tasks;

  // Signal to track selected status filters
  selectedStatuses = signal<TaskStatus[]>([]);

  // Pagination controls
  page = 0;
  size = 6;
  totalPages = 0;

  // Sorting controls
  sortBy: TaskSortFields = 'createdAt';
  sortDir: OrderByFields = 'ASC';
  sortFields: TaskSortFieldLabels[] = [
    { value: 'createdAt', label: 'Created At' },
    { value: 'updatedAt', label: 'Updated At' },
    { value: 'title', label: 'Title' },
    { value: 'status', label: 'Status' },
  ];

  // Available task status filter options
  statusOptions = statuses;

  /**
   * Lifecycle hook: initializes task loading on component mount
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Lifecycle hook: clears UI messages on component destroy
   */
  ngOnDestroy() {
    this.uiService.clearError();
    this.uiService.clearSuccess();
  }

  /**
   * Navigates to the previous page and reloads tasks
   */
  prevPage() {
    this.page--;
    this.loadData();
  }

  /**
   * Navigates to the next page and reloads tasks
   */
  nextPage() {
    this.page++;
    this.loadData();
  }

  /**
   * Adds or removes a task status from the selected filters
   * Triggers data reload
   */
  toggleStatusFilter(status: TaskStatus) {
    if (this.isStatusSelected(status)) {
      this.selectedStatuses.update(prev => prev.filter(s => s !== status));
    } else {
      this.selectedStatuses.update(prev => [...prev, status]);
    }
    this.resetPagination();
    this.loadData();
  }

  /**
   * Checks whether a status is currently selected
   */
  isStatusSelected(status: TaskStatus) {
    return this.selectedStatuses().includes(status);
  }

  /**
   * Clears all active filters and reloads tasks
   */
  clearFilters() {
    this.selectedStatuses.set([]);
    this.resetPagination();
    this.loadData();
  }

  /**
   * Called when the sort field is changed
   */
  onSortChange() {
    this.resetPagination();
    this.loadData();
  }

  /**
   * Toggles sorting direction (ASC <-> DESC)
   */
  toggleSortDir() {
    this.sortDir = this.sortDir === 'ASC' ? 'DESC' : 'ASC';
    this.resetPagination();
    this.loadData();
  }

  /**
   * Fetches paginated and filtered tasks from the service
   */
  loadData() {
    this.taskService.getUserPaginatedFilteredTasks(this.getTaskFilters()).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages;
        this.page = response.currentPage;
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      }
    });
  }

  /**
   * Constructs the TaskFiltersDTO object used for filtering + pagination
   */
  private getTaskFilters(): TaskFiltersDTO {
    return {
      page: this.page,
      size: this.size,
      sortBy: this.sortBy,
      orderBy: this.sortDir,
      taskStatus: this.selectedStatuses()
    }
  }

  /**
   * Resets pagination to the first page (used on filter/sort changes)
   */
  private resetPagination() {
    this.page = 0;
  }
}
