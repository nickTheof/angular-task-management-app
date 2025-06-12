import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {
    class: 'flex-grow p-4'
  }
})
export class DashboardComponent {
    private authService = inject(AuthService);
    currentUser = this.authService.user;

    get isAdmin() {
      return this.currentUser()?.role === 'ADMIN';
    }
}
