import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docter-appointment',
  standalone: false,
  templateUrl: './docter-appointment.component.html',
  styleUrl: './docter-appointment.component.css'
})

export class DocterAppointmentComponent {

  doctor: any;
  isFilterOpen = false;

  constructor(private router: Router) {}

  bookAppointment(id: number) {
    if (!id) return;

    this.router.navigate(['/doctor/appointments/create-appointment', 1]);
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isFilterOpen = false;
    }
  }

}
