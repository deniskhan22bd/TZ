import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social_frontend';

  constructor(private router: Router) { }

  get userId(): string | null {
    return localStorage.getItem('userId');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
