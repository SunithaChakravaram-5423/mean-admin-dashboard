import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  // Analytics
  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics`, { headers: this.getHeaders() });
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  updateUserRole(id: string, role: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}/role`, { role }, { headers: this.getHeaders() });
  }

  // Content
  getContent(): Observable<any> {
    return this.http.get(`${this.baseUrl}/content`, { headers: this.getHeaders() });
  }

  addContent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/content`, data, { headers: this.getHeaders() });
  }

  deleteContent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/content/${id}`, { headers: this.getHeaders() });
  }
}
