import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescription-history',
  standalone: false,
  templateUrl: './prescription-history.component.html',
  styleUrl: './prescription-history.component.css'
})
export class PrescriptionHistoryComponent {

  doctor: any;
  isFilterOpen = false;

  constructor(private router: Router) {}

  bookAppointment(id: number) {
    if (!id) return;

    this.router.navigate(['/doctor/prescriptions/create-prescription', 1]);
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

  @ViewChild('prescriptionprint') prescriptionDiv!: ElementRef;
  isPrescriptionOpen: boolean = false;

  closePrescription() {
    this.isPrescriptionOpen = false;
  }

printPrescription() {
    // Option 1: using document.getElementById
    const printContents = document.getElementById('prescriptionprint')?.innerHTML;

    if (!printContents) return;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Prescription</title>
            <style>
              /* Optional: copy some styles */
              body { font-family: Arial, sans-serif; padding: 20px; color: #1e293b; }
            .prescription-page { max-width: 900px; margin: auto; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 6px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
            h1, h2, h3, h4 { margin: 0; }
            .uppercase { text-transform: uppercase; }
            .text-right { text-align: right; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
    }
  }
}
