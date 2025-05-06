import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderService } from '../../services/tender.model.service';
import { Tender } from '../../models/tender';

@Component({
  selector: 'app-tender-form',
  templateUrl: './create-tender.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {
  tenderForm: FormGroup;
  isEditMode = false;
  tenderId?: number;
  pageTitle = 'Create New Tender';

  categories = [
    'IT', 'Construction', 'Supplies', 'Services', 'Consulting', 'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tenderService: TenderService
  ) {
    this.tenderForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      budget: [0, [Validators.required, Validators.min(1)]],
      deadline: ['', Validators.required],
      status: ['open', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode = true;
      this.tenderId = parseInt(id, 10);
      this.pageTitle = 'Edit Tender';
      
      this.tenderService.getTenderById(this.tenderId).subscribe(tender => {
        if (tender) {
          // Format the date to YYYY-MM-DD for the input field
          const deadlineDate = new Date(tender.deadline);
          const formattedDeadline = deadlineDate.toISOString().split('T')[0];
          
          this.tenderForm.patchValue({
            ...tender,
            deadline: formattedDeadline
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.tenderForm.valid) {
      const formValues = this.tenderForm.value;
      const tender: Tender = {
        ...formValues,
        id: this.isEditMode ? this.tenderId! : 0,
        publishedDate: this.isEditMode ? new Date() : new Date(),
        deadline: new Date(formValues.deadline)
      };
      
      if (this.isEditMode) {
        this.tenderService.updateTender(tender).subscribe(() => {
          this.router.navigate(['/tenders']);
        });
      } else {
        this.tenderService.addTender(tender).subscribe(() => {
          this.router.navigate(['/tenders']);
        });
      }
    } else {
      // Mark all form controls as touched to trigger validation errors
      Object.keys(this.tenderForm.controls).forEach(key => {
        this.tenderForm.get(key)?.markAsTouched();
      });
    }
  }
}