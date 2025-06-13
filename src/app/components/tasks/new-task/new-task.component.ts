import {Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TitleCasePipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';
import type {TaskInsertDTO, TaskStatus} from '../../../shared/interfaces/task.interfaces';
import {getError} from '../../../shared/utils/field.validator';
import {TaskService} from '../../../shared/services/task.service';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';
import {statuses} from '../../../shared/utils/task-status';


@Component({
  selector: 'app-new-task',
  imports: [
    RouterLink,
    CardResponsesComponent,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  host: {
    class: 'flex-grow p-16'
  }
})
export class NewTaskComponent implements OnDestroy {
  // Inject required services
  private taskService = inject(TaskService);
  private uiService = inject(UiCardResponsesService);
  private router = inject(Router);

  // Util data and functions
  statusOptions = statuses;
  getErrors = getError;

  // Instantiate an Angular Reactive Form
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl<TaskStatus>('OPEN', [Validators.required]),
  })

  // Cleaning error card responses on destroy
  ngOnDestroy() {
    this.uiService.clearError();
  }

  // Procedure executed when the new task form submitted
  onSubmitForm() {
    if (this.form.invalid) return;
    const dto: TaskInsertDTO = this.getTaskInsertDTO();
    this.uiService.activateLoading();
    this.taskService.insertMyTask(dto).subscribe(
      {
        next: task => {
          this.uiService.setSuccess(`Task with uuid: ${task.uuid} inserted successfully.`);
          this.router.navigate(['../','dashboard', 'tasks'], {replaceUrl: true});
          this.uiService.deactivateLoading();
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.setError(err.error.message);
          this.uiService.deactivateLoading();
        }
      }
    )
  }

  // Helper Method for creating DTO from form values
  private getTaskInsertDTO(): TaskInsertDTO {
    return {
      title: this.form.get('title')?.value || '',
      description: this.form.get('description')?.value || '',
      status: this.form.get('status')?.value || 'OPEN',
    }
  }
}
