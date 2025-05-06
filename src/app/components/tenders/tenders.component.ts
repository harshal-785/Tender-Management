import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  imports:[CommonModule,RouterModule],
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {
  tenders = [
    { id: 1, title: 'Hospital Equipment Supply', deadline: '2025-06-15', budget: '$150,000', status: 'Open', bids: 8 },
    { id: 2, title: 'School Building Renovation', deadline: '2025-05-30', budget: '$500,000', status: 'Open', bids: 12 },
    { id: 3, title: 'IT Infrastructure Upgrade', deadline: '2025-05-20', budget: '$250,000', status: 'Closed', bids: 6 },
    { id: 4, title: 'Road Maintenance Project', deadline: '2025-07-10', budget: '$400,000', status: 'Open', bids: 3 },
    { id: 5, title: 'Public Park Development', deadline: '2025-06-05', budget: '$350,000', status: 'Closed', bids: 10 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
