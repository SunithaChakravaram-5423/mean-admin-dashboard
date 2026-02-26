import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  template: `
    <div class="container-fluid py-4">
      <h4 class="page-title">👥 User Management</h4>

      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
      </div>

      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
      <div *ngIf="success" class="alert alert-success">{{ success }}</div>

      <div class="card" *ngIf="!loading">
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th class="ps-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th class="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td class="ps-3 fw-semibold">{{ user.name }}</td>
                <td class="text-muted">{{ user.email }}</td>
                <td>
                  <span class="badge" [ngClass]="user.role === 'admin' ? 'bg-danger' : 'bg-secondary'">
                    {{ user.role }}
                  </span>
                </td>
                <td class="text-muted">{{ user.createdAt | date:'mediumDate' }}</td>
                <td class="text-end pe-3">
                  <button
                    class="btn btn-sm btn-outline-primary me-1"
                    (click)="changeRole(user)"
                    [disabled]="user._id === currentUser?.id">
                    Change Role
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    (click)="deleteUser(user._id)"
                    [disabled]="user._id === currentUser?.id">
                    Delete
                  </button>
                </td>
              </tr>
              <tr *ngIf="users.length === 0">
                <td colspan="5" class="text-center text-muted py-4">No users found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  error = '';
  success = '';
  currentUser: any;

  constructor(private api: ApiService, private auth: AuthService) {
    this.currentUser = this.auth.getUser();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (users) => { this.users = users; this.loading = false; },
      error: (err) => { this.error = err.error?.message || 'Failed to load users.'; this.loading = false; }
    });
  }

  deleteUser(id: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.api.deleteUser(id).subscribe({
      next: () => {
        this.success = 'User deleted.';
        this.users = this.users.filter(u => u._id !== id);
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => { this.error = err.error?.message || 'Delete failed.'; }
    });
  }

  changeRole(user: any): void {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Change ${user.name}'s role to ${newRole}?`)) return;
    this.api.updateUserRole(user._id, newRole).subscribe({
      next: (updated) => {
        user.role = updated.role;
        this.success = `Role updated to ${newRole}.`;
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => { this.error = err.error?.message || 'Role update failed.'; }
    });
  }
}
