import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: false,
  templateUrl: './doctor-sidebar.component.html',
  styleUrl: './doctor-sidebar.component.css'
})

export class DoctorSidebarComponent {

  constructor(private router: Router) {}

  logout() {
    // 2️⃣ Redirect to login page
    this.router.navigate(['/login']);
  }

}
