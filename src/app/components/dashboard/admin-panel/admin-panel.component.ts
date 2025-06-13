import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CardResponsesComponent} from '../../ui/card-responses/card-responses.component';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterLink, RouterOutlet, CardResponsesComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  host: {
    class: 'flex-grow p-4',
  }
})
export class AdminPanelComponent {

}
