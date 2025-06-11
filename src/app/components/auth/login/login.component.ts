import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from '../../../shared/services/auth.service';
import {LoginUserDTO} from '../../../shared/interfaces/user.interfaces';
import {ErrorCardComponent} from '../../ui/error-card/error-card.component';
import {LoadingSpinnerComponent} from '../../ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, ErrorCardComponent, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-24'
  }
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);
    showPassword = false;

    togglePasswordVisibility = () => {
      this.showPassword = !this.showPassword;
    }

    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })


    onLogin() {
      if (!this.form.valid) {
        return;
      }
      this.isLoading.set(true);
      this.authService.login(this.getLoginCredentials())
        .subscribe({
          next: (resp) => {
            this.isLoading.set(false);
            this.router.navigate(['../','dashboard']);
          },
          error: (err: HttpErrorResponse)  => {
            this.isLoading.set(false);
            this.error.set(err.error.message);
            this.form.reset();
            console.log(err);
          }
        })
    }

    private getLoginCredentials(): LoginUserDTO {
      return {
        username: this.form.value.username?.trim() || '',
        password: this.form.value.password?.trim() || ''
      }
    }

}
