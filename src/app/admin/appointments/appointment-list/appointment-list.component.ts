import { Component, ElementRef, HostListener } from '@angular/core';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})

export class AppointmentListComponent {

  isFilterDropdownOpen = false;
  selectedSpecialty = 'Select Filter';
  specialties = ['Select Filter', 'Pending', 'In Progress', 'Completed'];

  constructor(private eRef: ElementRef, private appointmentService: AppointmentService) { }

  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.isFilterDropdownOpen = false; // Close menu after selecting
    console.log('Filtering by:', specialty); // You can call your API filter here
  }

  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  showSlip = false;

  currentPage: number = 1;
  lastPage: number = 1;
  totalAppointments: number = 0;

  ngOnInit() {
    this.loadAppointments(1);
  }

  loadAppointments(page: number) {
  this.appointmentService.getAppointments(page).subscribe({
    next: (res: any) => {
      console.log('API Response:', res); // <--- OPEN YOUR BROWSER CONSOLE (F12) TO SEE THIS

      // If your API returns a standard Laravel pagination:
      if (res && res.data) {
        this.appointments = res.data;     // The array is inside 'data'
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.totalAppointments = res.total;
      } else {
        // If your API just returns a simple array (no pagination):
        this.appointments = res;
      }
    },
    error: (err) => {
      console.error('API Error:', err);
    }
  });
}

// Helper to generate the array of page numbers [1, 2, 3, 4...]
getPaginationRange() {
  const pages = [];
  // Show 5 pages around the current page
  for (let i = Math.max(1, this.currentPage - 2); i <= Math.min(this.lastPage, this.currentPage + 2); i++) {
    pages.push(i);
  }
  return pages;
}

get visiblePages(): number[] {
  const pages = [];
  const startPage = Math.max(1, this.currentPage - 1);
  const endPage = Math.min(this.lastPage, startPage + 3); // Shows 4 numbers

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
}

  openPreview(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.showSlip = true;
  }

  closePreview() {
    this.showSlip = false;
    this.selectedAppointment = null;
  }

  printSlip() {
    window.print();

  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterDropdownOpen = false;
    }
  }

}
