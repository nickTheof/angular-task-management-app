import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PaginationFilterService} from '../../../../shared/services/pagination-filter.service';
import {UserService} from '../../../../shared/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UiCardResponsesService} from '../../../../shared/services/ui-card-responses.service';
import {FormsModule} from '@angular/forms';
import {UserReadOnlyDTO} from '../../../../shared/interfaces/user.interfaces';
import {UserSortFields} from '../../../../shared/interfaces/pagination-filter.interfaces';

@Component({
  selector: 'app-admin-users',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  paginationService = inject(PaginationFilterService);
  private userService = inject(UserService);
  private uiService = inject(UiCardResponsesService);

  users = this.userService.users;

  sortByField: UserSortFields = 'username';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  sortBy(field: UserSortFields) {
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
      this.userService.getFilteredUsers(this.paginationService.getQuery()).subscribe({
        next: (response) => {
          this.totalPages = response.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.setError(err.error.message);
        }
      });
    }

    updateUserRole(user: UserReadOnlyDTO, role: string): void {
      this.userService.updateUserRole(user, role).subscribe({
        next: (response) => {
          this.uiService.setSuccess(`User role with username ${user.username} updated successfully.`);
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.setError(err.error.message);
        },
        complete: () => {
          this.loadData();
        }
      })
    }

    toggleActive(user: UserReadOnlyDTO) {
      this.userService.updateUserStatus(user).subscribe({
        next: (response) => {
          this.uiService.setSuccess(`User activity status with username ${user.username} changed successfully.`);
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.setError(err.error.message);
        },
        complete: () => {
          this.loadData();
        }
      })
    }


    deleteUser(user: UserReadOnlyDTO) {
      this.userService.deleteUser(user).subscribe({
        next: (response) => {
          this.uiService.setSuccess(`User with username ${user.username} deleted`);
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
