import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  analytics: any = null;
  loading = true;
  error = '';
  private salesChart: Chart | null = null;
  private roleChart: Chart | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
        setTimeout(() => this.renderCharts(), 100);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to load analytics.';
      }
    });
  }

  ngAfterViewInit(): void {}

  renderCharts(): void {
    if (!this.analytics) return;
    this.renderSalesChart();
    this.renderRoleChart();
  }

  renderSalesChart(): void {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;
    if (this.salesChart) this.salesChart.destroy();

    this.salesChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.analytics.monthlySales.map((s: any) => s.month),
        datasets: [{
          label: 'Monthly Sales ($)',
          data: this.analytics.monthlySales.map((s: any) => s.amount),
          backgroundColor: 'rgba(102, 126, 234, 0.7)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  renderRoleChart(): void {
    const canvas = document.getElementById('roleChart') as HTMLCanvasElement;
    if (!canvas) return;
    if (this.roleChart) this.roleChart.destroy();

    this.roleChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Admin', 'User'],
        datasets: [{
          data: [this.analytics.roleCounts.admin, this.analytics.roleCounts.user],
          backgroundColor: ['rgba(118, 75, 162, 0.8)', 'rgba(17, 153, 142, 0.8)'],
          borderColor: ['#764ba2', '#11998e'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.salesChart) this.salesChart.destroy();
    if (this.roleChart) this.roleChart.destroy();
  }
}
