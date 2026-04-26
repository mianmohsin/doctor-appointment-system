import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: false,
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent implements OnInit {
  isEditMode = false;
  patientId: string | null = null;
  isLoading = false;

  patientForm = {
    name: '',
    email: '',
    phone: '',
    status: 'active', // Default to lowercase to match DB
    profileImg: 'assets/images/default-avatar.png'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.isEditMode = true;
      this.loadPatientData(this.patientId);
    }


  }

  loadPatientData(id: string) {
    this.isLoading = true;
    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        // Map API data to form object
        this.patientForm = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status,
          profileImg: data.photo ? `http://127.0.0.1:8000/storage/${data.photo}` : 'https://i.pravatar.cc/150?u=' + id
        };
        this.isLoading = false;
      },
      error: (err) => console.error('Error loading patient:', err)
    });
  }

  save() {
    if (this.isEditMode && this.patientId) {
      this.patientService.updatePatient(this.patientId, this.patientForm).subscribe({
        next: () => {
          alert('Profile updated successfully');
          this.router.navigate(['/admin/patients']);
        },
        error: (err) => alert('Error updating profile: ' + err.error.message)
      });
    } else {
      // Add logic for Create Patient here if needed
      console.log('Create logic not implemented yet');
    }
  }

  resetPassword() {
    alert('A password reset link has been sent to ' + this.patientForm.email);
  }
}
