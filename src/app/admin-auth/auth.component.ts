import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './auth.component.css'
})
export class AdminAuthComponent {
  isLoading = false;

  // Unified Data Object (Matches your HTML [(ngModel)])
  adminData = {
    employeeId: '',
    password: ''
  };

  constructor(private router: Router) { }

  // This is the function called by (submit) in your HTML
  onAdminLogin() {
    this.isLoading = true;

    // Simulate API delay
    setTimeout(() => {
      // 1. Check credentials using the helper function
      const user = this.fakeAuthenticate(this.adminData.employeeId, this.adminData.password);

      // 2. Validate if user exists AND is an admin
      if (user && user.role === 'admin') {
        console.log('Admin Authenticated. Redirecting...');
        this.router.navigate(['/admin/dashboard']);
      } else {
        // 3. If wrong, stop loading and alert
        alert('ACCESS DENIED: Invalid Admin Credentials.');
        this.isLoading = false;
      }
    }, 1500);
  }

  // Helper function to simulate a database check
  private fakeAuthenticate(username: string, password: string) {
    const users = [
      { username: 'admin', password: '123', role: 'admin' },
    ];

    return users.find(u => u.username === username && u.password === password);
  }
}
