import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../services/tender.model.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css'],
  imports: [CommonModule, RouterModule,
    FormsModule
  ],
  standalone: true
})
export class TenderDetailsComponent implements OnInit {
  tender: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
if (id) {
  const numericId = +id;
  if (!isNaN(numericId)) {
    this.tenderService.getTenderById(numericId).subscribe({
      // ...
    });
  } else {
    console.error('Invalid ID parameter');
    this.isLoading = false;
  }
}
  }
}