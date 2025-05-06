import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports:[CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab: string = 'profile';
  profileForm: FormGroup;
  notificationForm: FormGroup;
  securityForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      name: ['John Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567', [Validators.required]],
      company: ['Acme Corporation', [Validators.required]],
      position: ['Procurement Manager', [Validators.required]],
      address: ['123 Business Ave, Suite 400', [Validators.required]],
      city: ['New York', [Validators.required]],
      country: ['United States', [Validators.required]]
    });
    
    this.notificationForm = this.formBuilder.group({
      emailNotifications: [true],
      tenderAlerts: [true],
      bidUpdates: [true],
      systemAnnouncements: [false],
      marketingEmails: [false]
    });
    
    this.securityForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
      alert('Profile updated successfully!');
    }
  }
  
  saveNotifications() {
    console.log('Notification settings updated:', this.notificationForm.value);
    alert('Notification settings updated successfully!');
  }
  
  savePassword() {
    if (this.securityForm.valid) {
      if (this.securityForm.get('newPassword')?.value !== this.securityForm.get('confirmPassword')?.value) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Password updated');
      alert('Password updated successfully!');
      this.securityForm.reset();
    }
  }
}
