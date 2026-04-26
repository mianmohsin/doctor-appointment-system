import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../core/services/doctor.service';
import { SpecialtyService } from '../../../core/services/specialty.service';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {

  isFilterDropdownOpen = false;
  specialties: string[] = [];
  selectedSpecialty: string = 'All Departments';

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  pagedDoctors: Doctor[] = [];

  isLoading: boolean = true;
  searchText: string = '';

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(
    private eRef: ElementRef,
    private router: Router, // 2. Inject Router
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (data: any[]) => {
        const apiNames = data.map(item => item.name);
        this.specialties = ['All Departments', ...apiNames];
      }
    });
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
        this.applyFilters();
      },
      error: () => this.isLoading = false
    });
  }

  // 3. Add the onEdit method
  onEdit(id: number | undefined) {
    if (!id) return;
    // Navigates to the edit route we will define in the routing module
    this.router.navigate(['/admin/doctors/edit', id]);
  }

  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.isFilterDropdownOpen = false;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchText.toLowerCase().trim();

    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(term) ||
        doctor.email.toLowerCase().includes(term);

      let matchesSpecialty = true;
      if (this.selectedSpecialty !== 'All Departments') {
        matchesSpecialty = doctor.specialties?.some(s => s.name === this.selectedSpecialty) ?? false;
      }

      return matchesSearch && matchesSpecialty;
    });

    this.totalPages = Math.ceil(this.filteredDoctors.length / this.pageSize) || 1;
    this.goToPage(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedDoctors = this.filteredDoctors.slice(start, end);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onDelete(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.doctors = this.doctors.filter(doctor => doctor.id !== id);
          this.applyFilters();
          alert('Doctor deleted successfully');
        },
        error: (err) => {
          alert('Server Error: ' + err.error.message);
        }
      });
    }
  }
}
