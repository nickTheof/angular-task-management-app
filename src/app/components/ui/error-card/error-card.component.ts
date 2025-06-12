import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.css'
})
export class ErrorCardComponent {
  error = input.required<string | null>();
  close = output();

  dismiss() {
    this.close.emit();
  }
}
