import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../services/tender.model.service';
import { Tender } from '../../models/tender';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  imports: [CommonModule, RouterModule,
    FormsModule
    
  ],
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {
  tenders: Tender[] = [];
  filteredTenders: Tender[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders(): void {
    this.tenderService.getTenders().subscribe((tenders: Tender[]) => {
      this.tenders = tenders;
      this.applyFilters();
    });
  }
  
  applyFilters(): void {
    this.filteredTenders = this.tenders.filter(tender => {
      // Filter by search term
      const matchesSearch = tender.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            tender.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filter by status
      const matchesStatus = this.filterStatus === 'all' || tender.status === this.filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  deleteTender(id: number): void {
    if (confirm('Are you sure you want to delete this tender?')) {
      this.tenderService.deleteTender(id).subscribe(success => {
        if (success) {
          this.loadTenders();
        }
      });
    }
  }
}