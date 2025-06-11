import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUserDTO } from '../../../shared/interfaces/user.interfaces';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4'
  }
})
export class LoginComponent {
    showPassword = false;

    togglePasswordVisibility = () => {
      this.showPassword = !this.showPassword;
    }

    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })

    // TODO: handle submit login
    onLogin() {
      if (!this.form.valid) {
        return;
      }
    }

    private getLoginCredentials(): LoginUserDTO {
      return {
        username: this.form.value.username?.trim() || '',
        password: this.form.value.password?.trim() || ''
      }
    }

}
