import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  isExpanded = false;
  isMobile = false;
  activeMenu!: string | null;

  constructor() { }

  ngOnInit(): void {
    // Only check screen size in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.isExpanded = !this.isMobile;
    } else {
      // Default values for server-side rendering
      this.isMobile = false;
      this.isExpanded = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      
      // Auto-collapse on mobile
      if (this.isMobile) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
    }
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
  }

  closeOnMobile(): void {
    if (this.isMobile) {
      this.isExpanded = false;
    }
  }

  isMasterOpen = false;

toggleMasterMenu() {
  this.isMasterOpen = !this.isMasterOpen;
}

}