import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-prescription-list',
  standalone: false,
  templateUrl: './prescription-list.component.html',
  styleUrl: './prescription-list.component.css'
})
export class PrescriptionListComponent {

  isFilterOpen = false;
  selectedStatus = 'All Status';

  statuses = ['All Status', 'Active', 'Completed', 'Cancelled', 'Expiring Soon'];

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFilterOpen = false;
    }
  }

  setStatus(status: string) {
    this.selectedStatus = status;
    this.isFilterOpen = false;
  }
}
