import type {UserReadOnlyDTO} from './user.interfaces';

export type TaskStatus =
  | 'OPEN'
  |'ONGOING'
  |'COMPLETED'
  |'FAILED'
  |'CANCELLED'

export interface TaskBadgeStyle {
  style: string;
  icon: string;
}

export interface TaskInsertDTO {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskUpdateDTO extends TaskInsertDTO {
}

export interface TaskReadOnlyDTO {
  id: number;
  uuid: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: UserReadOnlyDTO
}

export type TaskSortFields =
  |'createdAt' | 'updatedAt' | 'title' | 'status'

export type TaskSortLabels =
  |'Created At' | 'Updated At' | 'Title' | 'Status'

export interface TaskSortFieldLabels {
  value: TaskSortFields,
  label: TaskSortLabels
}

export type OrderByFields =
  'ASC' | 'DESC'


export interface TaskFiltersDTO {
  page: number;
  size: number;
  sortBy: TaskSortFields;
  orderBy: OrderByFields;
  taskStatus: TaskStatus[];
}

export interface Paginated<T> {
  data: T[],
  totalItems: number;
  totalPages: number;
  numberOfElements: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginatedFilteredTasks extends Paginated<TaskReadOnlyDTO> {}
