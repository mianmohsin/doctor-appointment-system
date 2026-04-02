import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-doctor',
  standalone: false,
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.css'
})
export class CreateDoctorComponent {

  doctorForm!: FormGroup;

  constructor(private location: Location, private router: Router, private fb: FormBuilder) { }
  ngOnInit() {
      this.doctorForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        gender: ['Male'],
        licenseId: ['', Validators.required],
        consultationFee: ['', Validators.required],
        education: [''],
        biography: [''],
        // Dynamic Array for Specialties
        specialties: this.fb.array([this.newSpecialty()])
      });
    }

    newSpecialty(): FormGroup {
    return this.fb.group({
      name: ['Cardiology'],
      experience: ['1']
    });
  }

  // Add a new row
  addSpecialty() {
    this.specialties.push(this.newSpecialty());
  }
  // Get the FormArray
  get specialties(): FormArray {
    return this.doctorForm.get('specialties') as FormArray;
  }
  // Remove a specific row
  removeSpecialty(i: number) {
    if (this.specialties.length > 1) {
      this.specialties.removeAt(i);
    }
  }

  goBack() {
    this.location.back(); // Returns to the previous listing page
  }

}
