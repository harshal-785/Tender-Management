import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tender } from '../models/tender';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tenders: Tender[] = [
    {
      id: 1,
      title: 'Website Development',
      description: 'Develop a modern website for our company',
      budget: 15000,
      deadline: new Date('2025-06-30'),
      status: 'open',
      publishedDate: new Date('2025-04-15'),
      category: 'IT',
      createdAt: '',
      publishDate: ''
    },
    {
      id: 2,
      title: 'Office Supplies',
      description: 'Supply office stationery and equipment',
      budget: 5000,
      deadline: new Date('2025-05-20'),
      status: 'open',
      publishedDate: new Date('2025-04-01'),
      category: 'Supplies',
      createdAt: '',
      publishDate: ''
    },
    {
      id: 3,
      title: 'Security Services',
      description: 'Provide security guards for main building',
      budget: 20000,
      deadline: new Date('2025-05-15'),
      status: 'closed',
      publishedDate: new Date('2025-03-15'),
      category: 'Services',
      createdAt: '',
      publishDate: ''
    },
    {
      id: 4,
      title: 'Building Renovation',
      description: 'Renovate the reception area',
      budget: 50000,
      deadline: new Date('2025-08-10'),
      status: 'open',
      publishedDate: new Date('2025-04-10'),
      category: 'Construction',
      createdAt: '',
      publishDate: ''
    },
    {
      id: 5,
      title: 'IT Equipment',
      description: 'Supply laptops and servers',
      budget: 35000,
      deadline: new Date('2025-05-30'),
      status: 'awarded',
      publishedDate: new Date('2025-03-01'),
      category: 'IT',
      createdAt: '',
      publishDate: ''
    }
  ];

  constructor() {}

  getTenders(): Observable<Tender[]> {
    return of(this.tenders);
  }

  getTenderById(id: number): Observable<Tender | undefined> {
    const tender = this.tenders.find(t => t.id === id);
    return of(tender);
  }

  addTender(tender: Tender): Observable<Tender> {
    tender.id = this.tenders.length + 1;
    this.tenders.push(tender);
    return of(tender);
  }

  updateTender(tender: Tender): Observable<Tender> {
    const index = this.tenders.findIndex(t => t.id === tender.id);
    if (index !== -1) {
      this.tenders[index] = tender;
    }
    return of(tender);
  }

  deleteTender(id: number): Observable<boolean> {
    const index = this.tenders.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tenders.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
