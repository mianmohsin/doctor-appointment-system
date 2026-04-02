import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent {

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
