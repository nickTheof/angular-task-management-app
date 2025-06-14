import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-unauthorized-page',
  imports: [
    RouterLink
  ],
  templateUrl: 'unauthorized-page.component.html',
  styleUrl: 'unauthorized-page.component.css',
  host: {
    class: 'flex-grow pt-20'
  }
})
export class UnauthorizedPageComponent {

}
