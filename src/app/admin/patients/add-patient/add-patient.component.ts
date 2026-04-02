import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  standalone: false,
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})

export class AddPatientComponent {
isEditMode = false;
  patientId: string | null = null;

  // Form Object
  patientForm = {
    name: 'Lee Smith',
    email: 'john-gmail.com',
    phone: '+91 8878 978 123',
    status: 'Active',
    profileImg: 'https://i.pravatar.cc/150?u=lee'
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.isEditMode = true;
      this.loadPatientData(this.patientId);
    }
  }

  loadPatientData(id: string) {
    // API call would go here: this.service.getPatient(id).subscribe(...)
    console.log('Loading data for patient:', id);
  }

  resetPassword() {
    alert('A password reset link has been sent to ' + this.patientForm.email);
  }

  save() {
    if (this.isEditMode) {
      console.log('Updating Patient...', this.patientForm);
    } else {
      console.log('Creating Patient...', this.patientForm);
    }
    this.router.navigate(['/patients']);
  }
}
