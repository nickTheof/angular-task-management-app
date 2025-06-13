import {TaskReadOnlyDTO, TaskStatus} from './task.interfaces';
import {UserReadOnlyDTO} from './user.interfaces';

export type OrderByFields = 'ASC' | 'DESC'

export type TaskSortLabels = |'Created At' | 'Updated At' | 'Title' | 'Status'

export type UserSortLabels = 'Created At' | 'Updated At' | 'Username' | 'Role' | 'Active'

export type TaskSortFields = |'createdAt' | 'updatedAt' | 'title' | 'status'

export type UserSortFields = |'createdAt' | 'updatedAt' | 'username' | 'role' | 'active'

export type FilterSortFields = TaskSortFields | UserSortFields


export const TASK_SORT_FIELDS = [
  { value: 'createdAt', label: 'Created At' },
  { value: 'updatedAt', label: 'Updated At' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
];

export type TaskFilters = {
  uuid?:string;
  title?:string;
  userIsActive?: boolean;
  taskStatus?: TaskStatus[];
  userUuid?: string;
}

export type UserFilters = {
  uuid?: string;
  username?: string;
  role?: string;
  active?: boolean;
}
export type TFilters = TaskFilters | UserFilters;


export type PaginationQuery = {
  page: number;
  size: number;
  sortBy: FilterSortFields;
  orderBy: OrderByFields;
} & UserFilters & TaskFilters;

export interface Paginated<T> {
  data: T[],
  totalItems: number;
  totalPages: number;
  numberOfElements: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginatedFilteredTasks extends Paginated<TaskReadOnlyDTO> {}
export interface PaginatedFilteredUsers extends Paginated<UserReadOnlyDTO> {}
