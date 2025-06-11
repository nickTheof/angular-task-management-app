import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
  host: {
    class: 'absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-60 flex justify-center items-center z-10'
  }
})
export class LoadingSpinnerComponent {

}
