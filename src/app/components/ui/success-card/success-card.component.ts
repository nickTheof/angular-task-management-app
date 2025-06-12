import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-success-card',
  imports: [],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.css'
})
export class SuccessCardComponent {
  message = input.required<string | null>();
  close = output();

  dismiss() {
    this.close.emit();
  }
}
