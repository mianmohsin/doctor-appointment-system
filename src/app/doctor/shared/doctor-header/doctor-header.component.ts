import { Component,HostListener,signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-header',
  standalone: false,
  templateUrl: './doctor-header.component.html',
  styleUrl: './doctor-header.component.css'
})
export class DoctorHeaderComponent {

  isDropdownOpen = signal(false);

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  logout() {
    // remove token/session
    localStorage.removeItem('token'); // or your auth key

    // redirect to login page
    this.router.navigate(['/login']);

    console.log('User logged out');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeDropdown();
    }
  }

}
