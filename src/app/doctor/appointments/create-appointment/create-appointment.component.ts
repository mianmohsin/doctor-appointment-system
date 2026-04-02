import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-appointment',
  standalone: false,
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})

export class CreateAppointmentComponent {

  constructor(private route: ActivatedRoute, private location: Location) {}

  doctorId!: number;
  doctor!: any;

  ngOnInit() {
    this.doctorId = +this.route.snapshot.params['id'];

    this.doctor = {
      id: this.doctorId,
      name: 'Dr. Ahmed Khan'
    };
  }

  goBack() {
    this.location.back();
  }

}
