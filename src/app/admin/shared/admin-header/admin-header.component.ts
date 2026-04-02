import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  isProfileOpen = false;
  isNotificationOpen = false;

  // Mock Notification Data
  notifications = [
    { id: 1, type: 'appointment', title: 'New Appointment', desc: 'Alice Cooper booked for 10:30 AM', time: '5m ago', icon: 'bg-indigo-100 text-indigo-600', read: false },
    { id: 2, type: 'prescription', title: 'Prescription Pending', desc: 'Dr. Smith sent #RX-9902 for review', time: '1h ago', icon: 'bg-amber-100 text-amber-600', read: false },
    { id: 3, type: 'system', title: 'Security Alert', desc: 'New login detected from Mumbai, IN', time: '3h ago', icon: 'bg-rose-100 text-rose-600', read: true },
    { id: 4, type: 'patient', title: 'New Patient', desc: 'Mark Wilson registered via portal', time: '5h ago', icon: 'bg-emerald-100 text-emerald-600', read: true },
  ];

  constructor(private router: Router, private eRef: ElementRef, public sidebarService: SidebarService) {}

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.isProfileOpen = false; // Close profile if notification opens
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout() {
    // 2️⃣ Redirect to login page
    this.router.navigate(['/admin/login']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
      this.isNotificationOpen = false;
    }
  }

}
