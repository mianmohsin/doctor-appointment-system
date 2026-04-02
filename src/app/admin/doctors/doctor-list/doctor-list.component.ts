import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {

  isFilterDropdownOpen = false;
  selectedSpecialty = 'All Specialties';
  specialties = ['All Specialties', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

  constructor(private eRef: ElementRef, private route: ActivatedRoute, private router: Router) {}

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
