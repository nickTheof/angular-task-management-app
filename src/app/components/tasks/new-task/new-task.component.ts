import {Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import type {TaskInsertDTO, TaskStatus} from '../../../shared/interfaces/task.interfaces';
import {getError} from '../../../shared/utils/field.validator';
import {TaskService} from '../../../shared/services/task.service';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';
import {HttpErrorResponse} from '@angular/common/http';

const allStatuses: TaskStatus[] = ['OPEN', 'ONGOING', 'COMPLETED', 'FAILED', 'CANCELLED'];

@Component({
  selector: 'app-new-task',
  imports: [
    RouterLink,
    CardResponsesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  host: {
    class: 'flex-grow p-16'
  }
})
export class NewTaskComponent implements OnDestroy {
  private taskService = inject(TaskService);
  private uiService = inject(UiCardResponsesService);
  private router = inject(Router);

  statusOptions = allStatuses.map(status => ({
    value: status,
    label: status.charAt(0) + status.slice(1).toLowerCase()
  }));

  getErrors = getError;

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl<TaskStatus>('OPEN', [Validators.required]),
  })

  ngOnDestroy() {
    this.uiService.clearError();
  }

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

  getTaskInsertDTO(): TaskInsertDTO {
    return {
      title: this.form.get('title')?.value || '',
      description: this.form.get('description')?.value || '',
      status: this.form.get('status')?.value || 'OPEN',
    }
  }
}
