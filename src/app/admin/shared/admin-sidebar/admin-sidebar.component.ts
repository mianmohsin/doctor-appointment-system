import { Component } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: false,
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  isSidebarOpen = false; // Tracks mobile sidebar state

  constructor(public sidebarService: SidebarService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  isOpen: any = {
    doctors: false
  };

subMenuOpen: any = {};

toggleSubMenu(key: string) {
  this.subMenuOpen[key] = !this.subMenuOpen[key];
}

  toggleMenu(menu: string) {
    this.isOpen[menu] = !this.isOpen[menu];
  }


}
