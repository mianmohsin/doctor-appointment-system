import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})

export class DoctorListComponent {

  isFilterOpen = false;

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
}
