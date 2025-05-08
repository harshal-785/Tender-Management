import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: string[] = [];
  cities: string[] = [];
  selectedCountry: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries').subscribe((res) => {
      if (res && res.data) {
        this.countries = res.data.map((item: any) => item.name).sort();
      }
    });
  }

  onCountryChange(event: any): void {
    this.selectedCountry = event.target.value;
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/cities', {
      country: this.selectedCountry
    }).subscribe((res) => {
      this.cities = res.data || [];
    });
  }
}
