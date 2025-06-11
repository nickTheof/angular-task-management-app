import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  host: {
    class: 'flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4',
  }
})
export class ForgotPasswordComponent {

}
