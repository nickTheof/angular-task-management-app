import {Component, inject, input, OnInit, signal} from '@angular/core';
import {TaskReadOnlyDTO, TaskStatus, TaskUpdateDTO} from '../../../shared/interfaces/task.interfaces';
import {TitleCasePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskService} from '../../../shared/services/task.service';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TaskBadgeComponent} from '../../ui/task-badge/task-badge.component';
import {statuses} from '../../../shared/utils/task-status';


@Component({
  selector: 'app-task-card',
  imports: [
    TitleCasePipe,
    ReactiveFormsModule,
    TaskBadgeComponent
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  // Inject required services
  private taskService = inject(TaskService);
  private uiService = inject(UiCardResponsesService);

  // Component requires an input TaskReadOnlyDTO provided from the parent component
  task = input.required<TaskReadOnlyDTO>();

  // state useful for changing between display and edit mode
  isEdit = signal<boolean>(false);

  // TaskStatus[] useful in select box
  statusOptions = statuses;

  // Instantiate a FormGroup for using it in Edit Mode
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    status: new FormControl<TaskStatus>('OPEN', [Validators.required]),
  })

  // populate edit form data with taskReadOnlyDTO provided info
  ngOnInit() {
      this.form.setValue({
        title: this.task().title,
        description: this.task().description,
        status: this.task().status,
      })
  }

  // handler method for changing mode from display to edit and vice versa
  toggleEdit = () => {
    this.isEdit.update((val) => !val);
  }

  // Procedure executed when the delete button is clicked
  onDelete = () => {
    this.taskService.deleteMyTask(this.task().uuid).subscribe({
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      }
    })
  }

  // Procedure executed when the edit form is submitted
  saveChanges = () => {
    if (this.form.invalid) return;
    this.taskService.updateMyTask(this.task().uuid, this.getTaskUpdateDTO()).subscribe({
      next: () => {
        this.toggleEdit();
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
      }
    })
  }

  // Helper Method for creating DTO from form values
  getTaskUpdateDTO(): TaskUpdateDTO {
    return {
      title: this.form.get('title')?.value || '',
      description: this.form.get('description')?.value || '',
      status: this.form.get('status')?.value || 'OPEN',
    }
  }
}
