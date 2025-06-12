import {Component, inject} from '@angular/core';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {ErrorCardComponent} from '../error-card/error-card.component';
import {SuccessCardComponent} from '../success-card/success-card.component';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';

@Component({
  selector: 'app-card-responses',
  imports: [LoadingSpinnerComponent, ErrorCardComponent, SuccessCardComponent],
  templateUrl: './card-responses.component.html',
  styleUrl: './card-responses.component.css'
})
export class CardResponsesComponent {
  private uiService = inject(UiCardResponsesService);
  isLoading = this.uiService.isLoading;
  success = this.uiService.success;
  error = this.uiService.error;

  clearCard() {
    if (this.uiService.success()) {
      this.uiService.clearSuccess();
    } else {
      this.uiService.clearError()
    }
  }
}
