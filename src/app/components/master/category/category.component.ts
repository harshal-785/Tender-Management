// category.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports:[CommonModule, ReactiveFormsModule,RouterModule],
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  isEditing = false;
  currentCategoryId: number | null = null;
  
  // Predefined categories for tenders
  predefinedCategories: string[] = [
    'Construction', 'IT Services', 'Healthcare', 'Education',
    'Transportation', 'Energy', 'Defense', 'Agriculture',
    'Telecommunications', 'Manufacturing', 'Professional Services',
    'Environmental Services', 'Food Services', 'Security Services'
  ];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)]
    });
  }

  ngOnInit(): void {
    // Load categories from local storage or API
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      if (this.isEditing && this.currentCategoryId !== null) {
        // Update existing category
        const index = this.categories.findIndex(cat => cat.id === this.currentCategoryId);
        if (index !== -1) {
          this.categories[index] = {
            ...this.categories[index],
            name: this.categoryForm.value.name,
            description: this.categoryForm.value.description
          };
        }
      } else {
        // Add new category
        const newCategory: Category = {
          id: this.generateId(),
          name: this.categoryForm.value.name,
          description: this.categoryForm.value.description,
          createdAt: new Date()
        };
        this.categories.push(newCategory);
      }
      
      // Save to local storage (could be replaced with API call)
      localStorage.setItem('categories', JSON.stringify(this.categories));
      
      // Reset form and state
      this.categoryForm.reset();
      this.isEditing = false;
      this.currentCategoryId = null;
    }
  }

  editCategory(category: Category): void {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
    this.isEditing = true;
    this.currentCategoryId = category.id;
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categories = this.categories.filter(cat => cat.id !== id);
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }
  }

  addPredefinedCategory(categoryName: string): void {
    // Check if category already exists
    if (!this.categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
      const newCategory: Category = {
        id: this.generateId(),
        name: categoryName,
        description: `Predefined category: ${categoryName}`,
        createdAt: new Date()
      };
      this.categories.push(newCategory);
      localStorage.setItem('categories', JSON.stringify(this.categories));
    } else {
      alert('This category already exists!');
    }
  }

  cancelEdit(): void {
    this.categoryForm.reset();
    this.isEditing = false;
    this.currentCategoryId = null;
  }

  private generateId(): number {
    return this.categories.length ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
  }
}