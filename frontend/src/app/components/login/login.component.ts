import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-wrapper">
      <div class="auth-card bg-white">
        <h3>🔐 Admin Login</h3>

        <div class="alert alert-danger" *ngIf="error">{{ error }}</div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" [(ngModel)]="email" placeholder="admin@example.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" [(ngModel)]="password" placeholder="••••••••">
        </div>

        <button class="btn btn-primary w-100 mb-3" (click)="login()" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="text-center text-muted mb-0">
          No account? <a routerLink="/register">Register here</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Access denied. Admin accounts only.';
          this.auth.logout();
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
