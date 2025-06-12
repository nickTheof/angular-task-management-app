import {Component, inject, OnDestroy} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';
import {PasswordRecoveryService} from '../../../shared/services/password-recovery.service';
import {UserForgotPasswordDTO} from '../../../shared/interfaces/user.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule, CardResponsesComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-24',
  }
})
export class ForgotPasswordComponent implements OnDestroy {
  private uiService = inject(UiCardResponsesService);
  private passwordRecoveryService = inject(PasswordRecoveryService);
  enteredUsername:string = '';

  ngOnDestroy() {
    this.uiService.clearError();
    this.uiService.clearSuccess();
  }

  onSubmitForm() {
    if (!this.enteredUsername) return;
    const dto: UserForgotPasswordDTO = {
      username: this.enteredUsername.trim(),
    }
    this.uiService.activateLoading();
    this.passwordRecoveryService.sendForgetPasswordRequest(dto).subscribe({
      next: result => {
        this.uiService.setSuccess(result.message);
        this.clearUsername();
        this.uiService.deactivateLoading();
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
        this.clearUsername();
        this.uiService.deactivateLoading();
      }
    })
  }

  private clearUsername() {
    this.enteredUsername = '';
  }
}
