import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorService } from '../../../core/services/doctor.service';

@Component({
  selector: 'app-create-doctor',
  standalone: false,
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.css'
})
export class CreateDoctorComponent implements OnInit {

  doctorForm!: FormGroup;
  specialtyOptions: any[] = [];
  isSubmitting = false;
 isEditMode = false;
  doctorId!: number;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadSpecialties();

    this.doctorId = +this.route.snapshot.params['id'];
    if (this.doctorId) {
      this.isEditMode = true;
      this.loadDoctorData();
    }
  }

  initForm() {
    this.doctorForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['Male'],
      licenseId: ['', Validators.required],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      status: ['active'], // Match your DB default
      education: [''],
      biography: [''],
      specialties: this.fb.array([this.newSpecialty()])
    });
  }

  loadSpecialties() {
    this.specialtyService.getSpecialties().subscribe(data => {
      this.specialtyOptions = data;
    });
  }

  // Updated to match HTML formControlNames
  newSpecialty(): FormGroup {
    return this.fb.group({
      specialty_id: ['', Validators.required], // Store ID for the DB
      experience: ['1', Validators.required]
    });
  }

  get specialties(): FormArray {
    return this.doctorForm.get('specialties') as FormArray;
  }

  addSpecialty() {
    this.specialties.push(this.newSpecialty());
  }

  removeSpecialty(i: number) {
    if (this.specialties.length > 1) {
      this.specialties.removeAt(i);
    }
  }

  // onSubmit() {
  //   if (this.doctorForm.invalid) {
  //     this.doctorForm.markAllAsTouched();
  //     return;
  //   }

  //   this.isSubmitting = true;

  //   const formValue = this.doctorForm.value;

  //   // 1. Map the data to match Laravel's expected keys
  //   const payload = {
  //     name: formValue.fullName,             // 'fullName' becomes 'name'
  //     email: formValue.email,
  //     phone: formValue.phone,
  //     gender: formValue.gender,
  //     license_id: formValue.licenseId,      // 'licenseId' becomes 'license_id'
  //     consultation_fee: formValue.consultationFee,
  //     status: formValue.status || 'active',
  //     education: formValue.education,
  //     bio: formValue.biography,             // 'biography' becomes 'bio'

  //     // Map the specialties array to match the Postman test that worked
  //     specialties: formValue.specialties.map((s: any) => ({
  //       id: s.specialty_id,                 // 'specialty_id' becomes 'id'
  //       years: s.experience                 // 'experience' becomes 'years'
  //     }))
  //   };

  //   console.log('Sending Payload:', payload);

  //   // 2. Send the mapped payload instead of the raw form value
  //   this.doctorService.createDoctor(payload).subscribe({
  //     next: (res) => {
  //       this.router.navigate(['/admin/doctors']);
  //     },
  //     error: (err) => {
  //       console.error('Submission Error:', err);
  //       this.isSubmitting = false;
  //       // If validation fails again, you can see exactly which field it is here
  //       if(err.status === 422) {
  //         alert('Validation Error: ' + JSON.stringify(err.error.errors));
  //       }
  //     }
  //   });
  // }

  loadDoctorData() {
    this.doctorService.getDoctorById(this.doctorId).subscribe(doctor => {
      // 1. Fill basic info
      this.doctorForm.patchValue({
        fullName: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        gender: doctor.gender,
        licenseId: doctor.license_id,
        consultationFee: doctor.consultation_fee,
        status: doctor.status,
        education: doctor.education,
        biography: doctor.bio
      });

      // 2. Fill Specialties FormArray
      this.specialties.clear(); // Remove the default empty row
      doctor.specialties?.forEach(spec => {
        this.specialties.push(this.fb.group({
          specialty_id: [spec.id],
          experience: [spec.pivot.years_of_exp] // Pivot data from Laravel
        }));
      });
    });
  }

  onSubmit() {
    if (this.doctorForm.invalid) return;
    this.isSubmitting = true;

    // Prepare Payload (Map names to match Laravel)
    const payload = {
      name: this.doctorForm.value.fullName,
      email: this.doctorForm.value.email,
      phone: this.doctorForm.value.phone,
      gender: this.doctorForm.value.gender,
      license_id: this.doctorForm.value.licenseId,
      consultation_fee: this.doctorForm.value.consultationFee,
      status: this.doctorForm.value.status,
      education: this.doctorForm.value.education,
      bio: this.doctorForm.value.biography,
      specialties: this.doctorForm.value.specialties.map((s: any) => ({
        id: s.specialty_id,
        years: s.experience
      }))
    };

    if (this.isEditMode) {
      this.doctorService.updateDoctor(this.doctorId, payload).subscribe({
        next: () => this.router.navigate(['/admin/doctors']),
        error: () => this.isSubmitting = false
      });
    } else {
      this.doctorService.createDoctor(payload).subscribe({
        next: () => this.router.navigate(['/admin/doctors']),
        error: () => this.isSubmitting = false
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
