import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-prescription',
  standalone: false,
  templateUrl: './create-prescription.component.html',
  styleUrl: './create-prescription.component.css'
})
export class CreatePrescriptionComponent {

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
