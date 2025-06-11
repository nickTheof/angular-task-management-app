import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.css',
  host: {
    class: 'flex-grow pt-20'
  }
})
export class HomeComponent {

}
