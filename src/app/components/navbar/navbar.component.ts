import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, DatePipe],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentDate = new Date();
  username = 'Admin User';

  constructor() { }

  ngOnInit(): void { }
}