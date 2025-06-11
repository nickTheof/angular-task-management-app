import {Component, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css'
})
export class HeaderComponent implements OnInit {
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
}
