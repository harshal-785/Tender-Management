// status.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Status {
  id: number;
  name: string;
  description: string;
  color: string;
  isDefault: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statusForm: FormGroup;
  statuses: Status[] = [];
  isEditing = false;
  currentStatusId: number | null = null;
  filteredStatuses: Status[] = [];
  searchTerm = '';
  
  // Predefined colors for status selection
  predefinedColors: string[] = [
    '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', 
    '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'
  ];

  // Default statuses for the system
  defaultStatuses: Array<{name: string, color: string, description: string}> = [
    { name: 'Draft', color: '#9E9E9E', description: 'Tender is in draft mode' },
    { name: 'Published', color: '#4CAF50', description: 'Tender is published and open for bids' },
    { name: 'Under Review', color: '#FFC107', description: 'Bids are being evaluated' },
    { name: 'Closed', color: '#F44336', description: 'Tender is closed for new bids' },
    { name: 'Awarded', color: '#3F51B5', description: 'Tender has been awarded' },
    { name: 'Cancelled', color: '#9C27B0', description: 'Tender has been cancelled' }
  ];

  constructor(private fb: FormBuilder) {
    this.statusForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.maxLength(200)],
      color: ['#4CAF50', Validators.required],
      isDefault: [false]
    });
  }

  ngOnInit(): void {
    // Load statuses from local storage or API
    const savedStatuses = localStorage.getItem('statuses');
    if (savedStatuses) {
      this.statuses = JSON.parse(savedStatuses);
    } else {
      // Initialize with default statuses if none exist
      this.initializeDefaultStatuses();
    }
    this.filterStatuses();
  }

  initializeDefaultStatuses(): void {
    let id = 1;
    this.defaultStatuses.forEach(status => {
      this.statuses.push({
        id: id++,
        name: status.name,
        description: status.description,
        color: status.color,
        isDefault: true,
        createdAt: new Date()
      });
    });
    localStorage.setItem('statuses', JSON.stringify(this.statuses));
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      if (this.isEditing && this.currentStatusId !== null) {
        // Update existing status
        const index = this.statuses.findIndex(s => s.id === this.currentStatusId);
        if (index !== -1) {
          this.statuses[index] = {
            ...this.statuses[index],
            name: this.statusForm.value.name,
            description: this.statusForm.value.description,
            color: this.statusForm.value.color,
            isDefault: this.statusForm.value.isDefault
          };
        }
      } else {
        // Add new status
        const newStatus: Status = {
          id: this.generateId(),
          name: this.statusForm.value.name,
          description: this.statusForm.value.description,
          color: this.statusForm.value.color,
          isDefault: this.statusForm.value.isDefault,
          createdAt: new Date()
        };
        this.statuses.push(newStatus);
      }
      
      // Save to local storage (could be replaced with API call)
      localStorage.setItem('statuses', JSON.stringify(this.statuses));
      
      // Reset form and state
      this.statusForm.reset({
        color: '#4CAF50',
        isDefault: false
      });
      this.isEditing = false;
      this.currentStatusId = null;
      this.filterStatuses();
    }
  }

  editStatus(status: Status): void {
    this.statusForm.patchValue({
      name: status.name,
      description: status.description,
      color: status.color,
      isDefault: status.isDefault
    });
    this.isEditing = true;
    this.currentStatusId = status.id;
  }

  deleteStatus(id: number): void {
    // Check if it's a default status
    const statusToDelete = this.statuses.find(s => s.id === id);
    
    if (statusToDelete?.isDefault) {
      alert('Default statuses cannot be deleted from the system.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this status?')) {
      this.statuses = this.statuses.filter(s => s.id !== id);
      localStorage.setItem('statuses', JSON.stringify(this.statuses));
      this.filterStatuses();
    }
  }

  cancelEdit(): void {
    this.statusForm.reset({
      color: '#4CAF50',
      isDefault: false
    });
    this.isEditing = false;
    this.currentStatusId = null;
  }

  filterStatuses(): void {
    if (!this.searchTerm) {
      this.filteredStatuses = [...this.statuses];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredStatuses = this.statuses.filter(status => 
      status.name.toLowerCase().includes(term) || 
      status.description.toLowerCase().includes(term)
    );
  }

  selectColor(color: string): void {
    this.statusForm.patchValue({ color });
  }

  private generateId(): number {
    return this.statuses.length ? Math.max(...this.statuses.map(s => s.id)) + 1 : 1;
  }
}