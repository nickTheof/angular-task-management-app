import {Component, inject, OnDestroy} from '@angular/core';
import { CardResponsesComponent } from '../../ui/card-responses/card-responses.component';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';

@Component({
  selector: 'app-tasks',
  imports: [CardResponsesComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnDestroy {
  private uiService = inject(UiCardResponsesService);

  ngOnDestroy() {
    this.uiService.clearError();
    this.uiService.clearSuccess();
  }


}
