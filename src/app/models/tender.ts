// models/tender.ts
export interface Tender {
    createdAt: string | number | Date;
    publishDate: string | number | Date;
    id: number;
    title: string;
    description: string;
    budget: number;
    deadline: Date;
    status: string;
    publishedDate: Date;
    category: string;
  }
  