import { Component } from '@angular/core';
import {HeaderComponent} from './components/layout/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300'
  }
})
export class App {
}
