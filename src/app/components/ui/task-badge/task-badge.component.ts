import {Component, input} from '@angular/core';
import {TaskBadgeStyle, TaskStatus} from '../../../shared/interfaces/task.interfaces';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-task-badge',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './task-badge.component.html',
  styleUrl: './task-badge.component.css'
})
export class TaskBadgeComponent {
  status = input.required<TaskStatus>()

  getBadgeStyle(): TaskBadgeStyle {
    switch (this.status()) {
      case 'OPEN':
        return {
          icon: 'fas fa-hourglass-start',
          style: 'text-blue-400 bg-blue-400/10 dark:bg-blue-300/10',
        };
      case 'ONGOING':
        return {
          icon: 'fas fa-circle-notch fa-spin',
          style: 'text-yellow-400 bg-yellow-400/10 dark:bg-yellow-300/10',
        };
      case 'COMPLETED':
        return {
          icon: 'fas fa-check-circle',
          style: 'text-green-400 bg-green-400/10 dark:bg-green-300/10',
        };
      case 'FAILED':
        return {
          icon: 'fas fa-times-circle',
          style: 'text-red-400 bg-red-400/10 dark:bg-red-300/10',
        };
      case 'CANCELLED':
        return {
          icon: 'fas fa-ban',
          style: 'text-gray-400 bg-gray-400/10 dark:bg-gray-300/10',
        };
      default:
        return {
          icon: 'fas fa-question-circle',
          style: 'text-gray-500 bg-gray-500/10 dark:bg-gray-400/10',
        };
    }
  }
}
