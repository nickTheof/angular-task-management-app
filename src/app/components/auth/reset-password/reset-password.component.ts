import {Component, inject, OnInit} from '@angular/core';
import {CardResponsesComponent} from "../../ui/card-responses/card-responses.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UiCardResponsesService} from '../../../shared/services/ui-card-responses.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {equalValues, getError} from '../../../shared/utils/field.validator';
import {HttpErrorResponse} from '@angular/common/http';
import {ResetPasswordDTO} from '../../../shared/interfaces/user.interfaces';
import {PasswordRecoveryService} from '../../../shared/services/password-recovery.service';

@Component({
  selector: 'app-reset-password',
    imports: [
        CardResponsesComponent,
        ReactiveFormsModule,
        RouterLink,
    ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-24',
  }
})
export class ResetPasswordComponent implements OnInit {
  // Inject required services
  private uiService = inject(UiCardResponsesService);
  private recoveryService = inject(PasswordRecoveryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  token: string | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.uiService.setError("Token not found");
        this.router.navigate(['/auth/login']);
      }
    })
  }

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
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'
      ),
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  }, [equalValues("password", "confirmPassword")]);

  // Procedure executed when the register form is submitted
  onSubmitReset() {
    if (!this.form.valid) {
      return;
    }
    this.uiService.activateLoading();
    this.recoveryService.sendResetPasswordRequest(this.getResetPasswordDTO()).subscribe({
      next: (resp) => {
        this.uiService.setSuccess(
          resp.message
        );
        this.form.reset();
        this.uiService.deactivateLoading();
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.setError(err.error.message);
        this.uiService.deactivateLoading();
      }
    })
  }

  // Helper method to create DTO from form values
  private getResetPasswordDTO(): ResetPasswordDTO {
    return {
      token: this.token || '',
      newPassword: this.form.value.password?.trim() || ''
    }
  }

  // Helper method to clear password fields after error
  private clearPasswords() {
    this.form.get("password")?.reset();
    this.form.get("confirmPassword")?.reset();
  }
}
