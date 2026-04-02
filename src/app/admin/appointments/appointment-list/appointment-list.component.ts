import { Component, ElementRef, HostListener } from '@angular/core';

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

  constructor(private eRef: ElementRef) { }
  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.isFilterDropdownOpen = false; // Close menu after selecting
    console.log('Filtering by:', specialty); // You can call your API filter here
  }

  showSlip = false;
  selectedAppointment: any = null;

  // Mock Data (In a real app, this comes from your table row click)
  appointmentData = {
    id: '#MD-1029',
    patientName: 'Lee Smith',
    patientEmail: 'john-gmail.com',
    patientPhone: '+91 8878 978 123',
    doctorName: 'Dr. Johnathan',
    date: 'Oct 24, 2023',
    time: '10:30 AM',
    type: 'In Person',
    payment: '500',
    paymentType: 'cash',
    status: 'Confirmed',
    location: 'Medcore Clinic, Block A, NY'
  };

  openPreview() {
    this.selectedAppointment = this.appointmentData;
    this.showSlip = true;
  }

  closePreview() {
    this.showSlip = false;
  }

  downloadPDF() {
    alert('Generating PDF for ' + this.selectedAppointment.id);
    // In production, use libraries like jspdf or html2canvas
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
