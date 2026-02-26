import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-wrapper">
      <div class="auth-card bg-white">
        <h3>📝 Create Account</h3>

        <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
        <div class="alert alert-success" *ngIf="success">{{ success }}</div>

        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" [(ngModel)]="name" placeholder="John Doe">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" [(ngModel)]="email" placeholder="john@example.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" [(ngModel)]="password" placeholder="••••••••">
        </div>
        <div class="mb-3">
          <label class="form-label">Role</label>
          <select class="form-select" [(ngModel)]="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button class="btn btn-success w-100 mb-3" (click)="register()" [disabled]="loading">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>

        <p class="text-center text-muted mb-0">
          Have an account? <a routerLink="/login">Login here</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'user';
  error = '';
  success = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    this.success = '';
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed.';
      }
    });
  }
}
