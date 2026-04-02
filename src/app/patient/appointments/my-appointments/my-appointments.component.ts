import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-appointments',
  standalone: false,
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent {

  doctor: any;
  isFilterOpen = false;

  constructor(private router: Router) {}

  bookAppointment(id: number) {
    if (!id) return;

    this.router.navigate(['/patient/appointments/create-appointment', 1]);
  }

}
