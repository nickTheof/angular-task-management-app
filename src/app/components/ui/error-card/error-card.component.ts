import {Component, input} from '@angular/core';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.css'
})
export class ErrorCardComponent {
  error = input.required<string | null>();
}
