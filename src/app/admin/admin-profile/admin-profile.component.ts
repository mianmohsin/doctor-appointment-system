import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})

export class AdminProfileComponent {
  activeTab = 'personal'; // personal, security, preferences
  isEditing = false;

  adminData = {
    firstName: 'Alexander',
    lastName: 'Thorne',
    role: 'Medical Director',
    email: 'a.thorne@medcore.com',
    phone: '+1 (555) 012-3456',
    location: 'New York, USA',
    bio: 'Overseeing clinical operations and digital transformation at Medcore Health Systems since 2021.',
    joinedDate: 'March 12, 2021',
    timezone: '(GMT-05:00) Eastern Time'
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.isEditing = false;
    // Trigger API Save here
    console.log('Profile Updated:', this.adminData);
  }
}
