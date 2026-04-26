import { Component, ElementRef, HostListener } from '@angular/core';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../models/patient.model';
import { Router } from '@angular/router';

type FilterStatus = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})

export class PatientListComponent {

  patients: Patient[] = [];

  // filter and search
  isFilterDropdownOpen = false;
  selectedSpecialty = 'All Patient';
  filteredPatients: Patient[] = [];
  searchText: string = '';
  specialties = ['All Patient', 'Active', 'Inactive'];
  selectedFilter: FilterStatus = 'all';

  // paging
  pagedPatients: Patient[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // How many patients per page
  totalPages: number = 1;

  constructor(private eRef: ElementRef, private patientService: PatientService, private router: Router,) { }

  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.isFilterDropdownOpen = false;

    // Map the UI label to the data status
    if (specialty === 'Active') {
      this.selectedFilter = 'active';
    } else if (specialty === 'Inactive') {
      this.selectedFilter = 'inactive';
    } else {
      this.selectedFilter = 'all';
    }

    this.applyFilters(); // Trigger the filter logic
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data;
      this.applyFilters();
    });

  }

  onEdit(id: number) {
    this.router.navigate(['/admin/patients/edit-patient', id]);
  }

  onDelete(id: number | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          // Remove from the local array
          this.patients = this.patients.filter(p => p.id !== id);

          // Re-run your search/pagination logic
          this.applyFilters();

          alert('Patient deleted successfully');
        },
        error: (err) => {
          // Show the specific error from Laravel (e.g., "Cannot delete patient with active appointments")
          alert('Error: ' + (err.error.message || 'Could not delete patient.'));
        }
      });
    }
  }

  onSearch(): void {
    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      this.filteredPatients = this.patients; // If search is empty, show all
      return;
    }

    this.filteredPatients = this.patients.filter(patient => {
      const nameMatch = patient.name.toLowerCase().includes(term);
      const idMatch = patient.id.toString().includes(term);

      // Returns true if either the name or ID matches the search term
      return nameMatch || idMatch;
    });
  }

  setFilter(filterType: 'all' | 'active' | 'inactive') {
    this.selectedFilter = filterType;
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchText.toLowerCase().trim();

    // 1. Filter the data first
    const result = this.patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(term) ||
                            patient.id.toString().includes(term);

      let matchesStatus = true;
      if (this.selectedSpecialty !== 'All Patient') {
        matchesStatus = patient.status.toLowerCase() === this.selectedSpecialty.toLowerCase();
      }
      return matchesSearch && matchesStatus;
    });

    this.filteredPatients = result;
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);

    // 2. Reset to page 1 when filter changes
    this.goToPage(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // 3. Slice the data to show only current page items
    this.pagedPatients = this.filteredPatients.slice(startIndex, endIndex);
  }

  // Helper to generate the numbers [1, 2, 3...] in the HTML
  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
