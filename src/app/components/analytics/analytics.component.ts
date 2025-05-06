import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  imports: [CommonModule,
  ],
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  // Sample data for charts
  tenderStatusData = [
    { name: 'Open', value: 12 },
    { name: 'Closed', value: 8 },
    { name: 'Draft', value: 3 }
  ];
  
  bidStatusData = [
    { name: 'Pending', value: 18 },
    { name: 'Approved', value: 14 },
    { name: 'Rejected', value: 9 }
  ];
  
  monthlyTendersData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 7 },
    { month: 'Mar', count: 4 },
    { month: 'Apr', count: 6 },
    { month: 'May', count: 8 }
  ];
  
  categoryData = [
    { name: 'Construction', value: 10 },
    { name: 'IT', value: 7 },
    { name: 'Healthcare', value: 5 },
    { name: 'Education', value: 4 },
    { name: 'Transportation', value: 3 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}