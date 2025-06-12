import {Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues, getError } from '../../../shared/utils/field.validator';
import {RegisterUserDTO} from '../../../shared/interfaces/user.interfaces';
import {RegistrationService} from '../../../shared/services/registration.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';


@Component({
  selector: 'app-register',
  imports: [
    RouterLink, ReactiveFormsModule, CardResponsesComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-24',
  }
})
export class RegisterComponent implements OnDestroy {
  // Inject required services
  private registrationService = inject(RegistrationService);
  private uiService = inject(UiCardResponsesService);
  private router = inject(Router);

  // Show/hide toggles for password and confirmation fields
  showPassword = false;
  showConfirmPassword = false;
  getErrors = getError;

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility = () => {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // The form group object with validation
  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'
      ),
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  }, [equalValues("password", "confirmPassword")]);

  // Clear error card responses when the component is destroyed
  ngOnDestroy() {
    this.uiService.clearError();
  }

  // Procedure executed when the register form is submitted
  onSubmitRegister() {
    if (!this.form.valid) {
      return;
    }
    this.uiService.activateLoading();
    this.registrationService.registerUser(this.getRegisterUserDTO()).subscribe({
      next: (resp) => {
        this.uiService.setSuccess(
          `User with username ${resp.username} registered successfully.`,
        );
        this.form.reset();
        this.uiService.deactivateLoading();
        this.router.navigate(['../', 'auth', 'login'], {
          replaceUrl: true
        });
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
        this.clearPasswords();
        this.uiService.deactivateLoading();
      },
    })
  }

  // Helper method to create DTO from form values
  private getRegisterUserDTO(): RegisterUserDTO {
    return {
      username: this.form.value.username?.trim() || '',
      password: this.form.value.password?.trim() || ''
    }
  }

  // Helper method to clear password fields after error
  private clearPasswords() {
    this.form.get("password")?.reset();
    this.form.get("confirmPassword")?.reset();
  }
}
