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
