import { Component, ElementRef, HostListener } from '@angular/core';
import { PrescriptionService } from '../../../core/services/prescription.service';
import { Prescription } from '../../../models/prescription.model';

@Component({
  selector: 'app-prescription-list',
  standalone: false,
  templateUrl: './prescription-list.component.html',
  styleUrl: './prescription-list.component.css'
})

export class PrescriptionListComponent {

  isFilterOpen = false;
  selectedStatus = 'All Status';
  prescriptions: Prescription[] = [];
  currentPage = 1;
  lastPage = 1;
  allPrescriptions: any[] = []; // Store the original full list here
  filteredPrescriptions: any[] = []; // This is what the HTML loops through
  searchTerm: string = '';

  statuses = ['All Status', 'Active', 'Completed', 'Cancelled',];

  constructor(private eRef: ElementRef, private prescriptionService: PrescriptionService) {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterOpen = false;
    }
  }

  ngOnInit() {
    this.loadPrescriptions();
  }

  onSearch() {
    this.currentPage = 1; // Reset to first page so search results are visible
    this.loadPrescriptions();
  }

  loadPrescriptions(page: number = 1) {
    this.currentPage = page;

    // Pass BOTH searchTerm and selectedStatus
    this.prescriptionService.getPrescriptions(this.currentPage, this.searchTerm, this.selectedStatus)
      .subscribe((res: any) => {
        this.prescriptions = res.data;
        this.lastPage = res.last_page;
      });
  }

    // Calculate age from DOB
  getAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  setStatus(status: string) {
    this.selectedStatus = status;
    this.isFilterOpen = false; // Close the dropdown
    this.currentPage = 1;      // Reset to page 1 when filtering
    this.loadPrescriptions();   // Fetch new data
  }

  get visiblePages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.lastPage, startPage + 3); // Show up to 4 numbers

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Function to call when a page number is clicked
  goToPage(page: number) {
    if (page >= 1 && page <= this.lastPage) {
      this.loadPrescriptions(page);
    }
  }

}
