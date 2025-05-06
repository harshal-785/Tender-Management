import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TenderService } from '../../services/tender.model.service';
import { Observable } from 'rxjs';
import { Tender } from '../../models/tender';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import 'chart.js/auto';  // Import to register controllers, elements, scales, etc.

interface CategoryStat {
  name: string;
  count: number;
  percentage: number;
}

interface ChartDataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChartCanvas') categoryChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statusChartCanvas') statusChartCanvas!: ElementRef<HTMLCanvasElement>;
  
  tenders: Tender[] = [];
  openTenders: number = 0;
  closedTenders: number = 0;
  awardedTenders: number = 0;
  totalBudget: number = 0;
  categoryStats: CategoryStat[] = [];
  upcomingDeadlines: Tender[] = [];
  
  categoryChart: Chart | null = null;
  statusChart: Chart | null = null;
  
  // Chart colors
  chartColors: string[] = [
    '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6D01', 
    '#46BFBD', '#F7464A', '#949FB1', '#4D5360', '#97BBCD'
  ];

  constructor(private tenderService: TenderService) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  ngAfterViewInit(): void {
    // Charts will be initialized after data is loaded
  }
  
  loadDashboardData(): void {
    this.tenderService.getTenders().subscribe(tenders => {
      this.tenders = tenders;
      this.calculateStats();
      this.calculateCategoryStats();
      this.findUpcomingDeadlines();
      
      // Initialize or update charts after data is loaded
      setTimeout(() => {
        this.initializeCharts();
      });
    });
  }
  
  refreshDashboard(): void {
    this.loadDashboardData();
  }
  
  calculateStats(): void {
    this.openTenders = this.tenders.filter(t => t.status === 'open').length;
    this.closedTenders = this.tenders.filter(t => t.status === 'closed').length;
    this.awardedTenders = this.tenders.filter(t => t.status === 'awarded').length;
    this.totalBudget = this.tenders.reduce((sum, tender) => sum + tender.budget, 0);
  }
  
  calculateCategoryStats(): void {
    // Get unique categories
    const categories = [...new Set(this.tenders.map(t => t.category))];
    
    // Calculate count and percentage for each category
    this.categoryStats = categories.map(category => {
      const count = this.tenders.filter(t => t.category === category).length;
      const percentage = (count / this.tenders.length) * 100;
      
      return {
        name: category,
        count,
        percentage
      };
    });
    
    // Sort by count (descending)
    this.categoryStats.sort((a, b) => b.count - a.count);
  }
  
  findUpcomingDeadlines(): void {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    this.upcomingDeadlines = this.tenders
      .filter(tender => {
        const deadlineDate = new Date(tender.deadline);
        return tender.status === 'open' &&
               deadlineDate >= today &&
               deadlineDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }
  
  getUrgencyClass(deadline: Date): string {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return 'urgent';
    } else if (diffDays <= 14) {
      return 'warning';
    } else {
      return 'normal';
    }
  }
  
  formatCurrency(value: number): string {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Chart initialization
  initializeCharts(): void {
    if (this.categoryChartCanvas && this.statusChartCanvas) {
      this.createCategoryChart();
      this.createStatusChart();
    }
  }

  createCategoryChart(): void {
    // Destroy existing chart if it exists
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }

    // Limit to top 5 categories for better visualization
    const topCategories = this.categoryStats.slice(0, 5);
    
    // Handle case where there might be more than 5 categories
    let otherCount = 0;
    if (this.categoryStats.length > 5) {
      otherCount = this.categoryStats.slice(5).reduce((sum, cat) => sum + cat.count, 0);
    }

    // Prepare chart data
    const labels = topCategories.map(cat => cat.name);
    const data = topCategories.map(cat => cat.count);
    
    // Add "Other" category if needed
    if (otherCount > 0) {
      labels.push('Other');
      data.push(otherCount);
    }

    // Ensure we have enough colors
    const backgroundColors = this.chartColors.slice(0, labels.length);

    // Create the chart configuration
    const config: ChartConfiguration = {
      type: 'pie' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Tender Categories Distribution'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                const percentage = (value / this.tenders.length * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    // Create the chart
    this.categoryChart = new Chart(
      this.categoryChartCanvas.nativeElement.getContext('2d')!,
      config
    );
  }

  createStatusChart(): void {
    // Destroy existing chart if it exists
    if (this.statusChart) {
      this.statusChart.destroy();
    }

    // Prepare chart data
    const labels = ['Open', 'Closed', 'Awarded'];
    const data = [this.openTenders, this.closedTenders, this.awardedTenders];
    const backgroundColors = [this.chartColors[0], this.chartColors[1], this.chartColors[2]];

    // Create the chart configuration
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Tenders',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Tender Status Distribution'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                const percentage = (value / this.tenders.length * 100).toFixed(1);
                return `Count: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    // Create the chart
    this.statusChart = new Chart(
      this.statusChartCanvas.nativeElement.getContext('2d')!,
      config
    );
  }

  // Method to export chart as image
  exportChartAsImage(chartType: 'category' | 'status'): void {
    const chart = chartType === 'category' ? this.categoryChart : this.statusChart;
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.href = url;
      link.download = `${chartType}-chart.png`;
      link.click();
    }
  }
}