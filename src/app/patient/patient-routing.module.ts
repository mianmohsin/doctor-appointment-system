import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import { BookAppointmentComponent } from './appointments/book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './appointments/my-appointments/my-appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PatientLayoutComponent } from './shared/patient-layout/patient-layout.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { MyInsuranceComponent } from './my-insurance/my-insurance.component';

const routes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [

      // Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Doctors
      {
        path: 'doctors',
        children: [
          { path: '', component: DoctorListComponent },
        ]
      },

      // Appointments
      {
        path: 'appointments',
        children: [
          { path: 'book/:doctorId', component: BookAppointmentComponent },
          { path: 'create-appointment/:id', component: BookAppointmentComponent },
          { path: 'my', component: MyAppointmentsComponent }
        ]
      },

      // Prescriptions
      {
        path: 'prescriptions',
        children: [
          { path: '', component: PrescriptionComponent }
        ]
      },

      // My Insurance
      {
        path: 'my-insurance',
        children: [
          { path: '', component: MyInsuranceComponent }
        ]
      },

      // Profile
      {
        path: 'my-profile',
        children: [
          { path: '', component: PatientProfileComponent }
        ]
      },

      // Default
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
