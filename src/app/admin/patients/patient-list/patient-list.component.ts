import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  isFilterDropdownOpen = false;
  selectedSpecialty = 'All Patient';
  specialties = ['All Patient', 'New', 'Returning'];

  constructor(private eRef: ElementRef) { }
  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.isFilterDropdownOpen = false; // Close menu after selecting
    console.log('Filtering by:', specialty); // You can call your API filter here
  }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterDropdownOpen = false;
    }
  }
}
