import type {UserReadOnlyDTO} from './user.interfaces';

export type TaskStatus =
  | 'OPEN'
  |'ONGOING'
  |'COMPLETED'
  |'FAILED'
  |'CANCELLED'

export interface TaskInsertDTO {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskReadOnlyDTO {
  id: number;
  uuid: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: UserReadOnlyDTO
}
