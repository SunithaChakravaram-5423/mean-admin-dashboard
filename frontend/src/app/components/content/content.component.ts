import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-content',
  template: `
    <div class="container-fluid py-4">
      <h4 class="page-title">📝 Content Management</h4>

      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
      <div *ngIf="success" class="alert alert-success">{{ success }}</div>

      <!-- Add Content Form -->
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3">Add New Content</h6>
          <div class="row g-2">
            <div class="col-md-4">
              <input type="text" class="form-control" [(ngModel)]="newTitle" placeholder="Title">
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" [(ngModel)]="newDescription" placeholder="Description">
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100" (click)="addContent()" [disabled]="saving">
                {{ saving ? 'Adding...' : '+ Add' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Table -->
      <div class="card">
        <div class="card-body p-0">
          <div *ngIf="loading" class="text-center py-4">
            <div class="spinner-border text-primary"></div>
          </div>

          <table class="table table-hover mb-0" *ngIf="!loading">
            <thead>
              <tr>
                <th class="ps-3">#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created</th>
                <th class="text-end pe-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of contentList; let i = index">
                <td class="ps-3 text-muted">{{ i + 1 }}</td>
                <td class="fw-semibold">{{ item.title }}</td>
                <td class="text-muted">{{ item.description }}</td>
                <td class="text-muted">{{ item.createdAt | date:'mediumDate' }}</td>
                <td class="text-end pe-3">
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteContent(item._id)">Delete</button>
                </td>
              </tr>
              <tr *ngIf="contentList.length === 0">
                <td colspan="5" class="text-center text-muted py-4">No content yet. Add some above!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ContentComponent implements OnInit {
  contentList: any[] = [];
  newTitle = '';
  newDescription = '';
  loading = true;
  saving = false;
  error = '';
  success = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.api.getContent().subscribe({
      next: (data) => { this.contentList = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load content.'; this.loading = false; }
    });
  }

  addContent(): void {
    if (!this.newTitle.trim() || !this.newDescription.trim()) {
      this.error = 'Both title and description are required.';
      return;
    }
    this.saving = true;
    this.error = '';
    this.api.addContent({ title: this.newTitle, description: this.newDescription }).subscribe({
      next: (item) => {
        this.contentList.unshift(item);
        this.newTitle = '';
        this.newDescription = '';
        this.saving = false;
        this.success = 'Content added!';
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to add content.';
        this.saving = false;
      }
    });
  }

  deleteContent(id: string): void {
    if (!confirm('Delete this content?')) return;
    this.api.deleteContent(id).subscribe({
      next: () => {
        this.contentList = this.contentList.filter(c => c._id !== id);
        this.success = 'Content deleted.';
        setTimeout(() => this.success = '', 3000);
      },
      error: () => { this.error = 'Delete failed.'; }
    });
  }
}
