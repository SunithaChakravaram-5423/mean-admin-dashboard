import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" *ngIf="auth.isLoggedIn()">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/dashboard">🛡️ AdminPanel</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/users" routerLinkActive="active">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/content" routerLinkActive="active">Content</a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <span class="nav-link text-light">
                👤 {{ auth.getUser()?.name }} 
                <span class="badge bg-primary ms-1">{{ auth.getUser()?.role }}</span>
              </span>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light btn-sm ms-2" (click)="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
  }
}
