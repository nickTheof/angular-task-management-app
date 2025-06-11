import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues, getError } from '../../../shared/utils/field.validator';
import {RegisterUserDTO} from '../../../shared/interfaces/user.interfaces';


@Component({
  selector: 'app-register',
  imports: [
    RouterLink, ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4',
  }
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  getErrors = getError;

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility = () => {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'
      ),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, [equalValues("password", "confirmPassword")]);


  //TODO: handle submit registration
  onSubmitRegister() {
    if (!this.form.valid) {
      return;
    }
  }

  private getRegisterUserDTO(): RegisterUserDTO {
    return {
      username: this.form.value.username?.trim() || '',
      password: this.form.value.password?.trim() || ''
    }
  }
}
