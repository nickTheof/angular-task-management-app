import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.user;
  isDarkMode: boolean = false;

  toggleDarkMode(): void {
    const html = document.documentElement;
    this.isDarkMode = html.classList.toggle('dark');
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }

  ngOnInit(): void {
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting === 'enabled') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    }
  }

  logout() {
    this.authService.clearCredentials();
    this.router.navigate([''], { replaceUrl: true });
  }

}
