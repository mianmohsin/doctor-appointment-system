import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../core/services/doctor.service';

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

  constructor(private eRef: ElementRef, private http: HttpClient, private doctorService: DoctorService) {}

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

  doctors: Doctor[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading = false;
      }
    });
   }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => {
        // Refresh the list after deleting
        this.doctors = this.doctors.filter(d => d.id !== id);
      });
    }
  }


}
