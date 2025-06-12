import {Component, inject, OnDestroy, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from '../../../shared/services/auth.service';
import {LoginUserDTO} from '../../../shared/interfaces/user.interfaces';
import {ErrorCardComponent} from '../../ui/error-card/error-card.component';
import {LoadingSpinnerComponent} from '../../ui/loading-spinner/loading-spinner.component';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, ErrorCardComponent, LoadingSpinnerComponent, CardResponsesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-24'
  }
})
export class LoginComponent implements OnDestroy {
  // Inject required services
    private authService = inject(AuthService);
    private router = inject(Router);
    private uiService = inject(UiCardResponsesService);

    // Show - Hide password field
    showPassword = false;
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

    // The form group Object
    form = new FormGroup({
      username: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required),
    })

  // Clear card response if the user navigates away without manually dismissing it
    ngOnDestroy() {
      this.uiService.clearError();
      // After a successful registration, display a success message and keep it visible.
      // If the user navigates away without manually dismissing it, it will be cleared in ngOnDestroy.
      this.uiService.clearSuccess();
    }

    // Procedure executed when login form submitted
  onSubmitLogin() {
      if (!this.form.valid) {
        return;
      }
      this.uiService.activateLoading()
      this.authService.login(this.getLoginCredentials())
        .subscribe({
          next: (resp) => {
            this.uiService.deactivateLoading();
            this.router.navigate(['../','dashboard']);
          },
          error: (err: HttpErrorResponse)  => {
            this.uiService.deactivateLoading();
            this.uiService.setError(err.error.message);
            this.form.get("password")?.reset();
          }
        })
    }

    // Helper Method for creating DTO from form values
    private getLoginCredentials(): LoginUserDTO {
      return {
        username: this.form.value.username?.trim() || '',
        password: this.form.value.password?.trim() || ''
      }
    }

}
