import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
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
}
