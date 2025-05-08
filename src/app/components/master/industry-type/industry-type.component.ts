// industry-type.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface IndustryType {
  id: number;
  name: string;
  description: string;
  isPredefined: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-industry-type',
  templateUrl: './industry-type.component.html',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  styleUrls: ['./industry-type.component.css']
})
export class IndustryTypeComponent implements OnInit {
  industryForm: FormGroup;
  industries: IndustryType[] = [];
  isEditing = false;
  currentIndustryId: number | null = null;
  filteredIndustries: IndustryType[] = [];
  searchTerm = '';
  
  // Predefined industry types
  predefinedIndustries: string[] = [
    'Information Technology', 'Healthcare', 'Manufacturing', 'Construction',
    'Banking & Finance', 'Oil & Gas', 'Education', 'Retail',
    'Telecommunications', 'Automotive', 'Aerospace & Defense', 'Agriculture',
    'Pharmaceuticals', 'Food Processing', 'Media & Entertainment', 'Hospitality',
    'Transportation & Logistics', 'Mining', 'Real Estate', 'Utilities',
    'Chemicals', 'Electronics', 'Textiles', 'Renewable Energy'
  ];

  constructor(private fb: FormBuilder) {
    this.industryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)]
    });
  }

  ngOnInit(): void {
    // Load industry types from local storage or API
    const savedIndustries = localStorage.getItem('industries');
    if (savedIndustries) {
      this.industries = JSON.parse(savedIndustries);
    }
    this.filterIndustries();
  }

  onSubmit(): void {
    if (this.industryForm.valid) {
      if (this.isEditing && this.currentIndustryId !== null) {
        // Update existing industry
        const index = this.industries.findIndex(ind => ind.id === this.currentIndustryId);
        if (index !== -1) {
          this.industries[index] = {
            ...this.industries[index],
            name: this.industryForm.value.name,
            description: this.industryForm.value.description
          };
        }
      } else {
        // Add new industry
        const newIndustry: IndustryType = {
          id: this.generateId(),
          name: this.industryForm.value.name,
          description: this.industryForm.value.description,
          isPredefined: false,
          createdAt: new Date()
        };
        this.industries.push(newIndustry);
      }
      
      // Save to local storage (could be replaced with API call)
      localStorage.setItem('industries', JSON.stringify(this.industries));
      
      // Reset form and state
      this.industryForm.reset();
      this.isEditing = false;
      this.currentIndustryId = null;
      this.filterIndustries();
    }
  }

  editIndustry(industry: IndustryType): void {
    this.industryForm.patchValue({
      name: industry.name,
      description: industry.description
    });
    this.isEditing = true;
    this.currentIndustryId = industry.id;
  }

  deleteIndustry(id: number): void {
    if (confirm('Are you sure you want to delete this industry type?')) {
      this.industries = this.industries.filter(ind => ind.id !== id);
      localStorage.setItem('industries', JSON.stringify(this.industries));
      this.filterIndustries();
    }
  }

  addPredefinedIndustry(industryName: string): void {
    // Check if industry already exists
    if (!this.industries.some(ind => ind.name.toLowerCase() === industryName.toLowerCase())) {
      const newIndustry: IndustryType = {
        id: this.generateId(),
        name: industryName,
        description: `Standard industry classification: ${industryName}`,
        isPredefined: true,
        createdAt: new Date()
      };
      this.industries.push(newIndustry);
      localStorage.setItem('industries', JSON.stringify(this.industries));
      this.filterIndustries();
    } else {
      alert('This industry type already exists!');
    }
  }

  cancelEdit(): void {
    this.industryForm.reset();
    this.isEditing = false;
    this.currentIndustryId = null;
  }

  filterIndustries(): void {
    if (!this.searchTerm) {
      this.filteredIndustries = [...this.industries];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredIndustries = this.industries.filter(industry => 
      industry.name.toLowerCase().includes(term) || 
      industry.description.toLowerCase().includes(term)
    );
  }

  private generateId(): number {
    return this.industries.length ? Math.max(...this.industries.map(i => i.id)) + 1 : 1;
  }
}