import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterLink],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  host: {
    class: 'flex-grow p-4',
  }
})
export class AdminPanelComponent {

}
