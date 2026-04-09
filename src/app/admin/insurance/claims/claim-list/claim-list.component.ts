import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-list',
  standalone: false,
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})

export class ClaimListComponent {

  constructor(private router: Router) {}

  bookAppointment() {
    this.router.navigate(['/admin/insurance/claim/create']);
  }

}
