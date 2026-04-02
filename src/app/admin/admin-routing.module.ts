import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

// Doctors
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';

// Patients
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';

// Appointments
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';

// Prescriptions
import { PrescriptionListComponent } from './prescriptions/prescription-list/prescription-list.component';
import { CreateDoctorComponent } from './doctors/create-doctor/create-doctor.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { CreatePrescriptionComponent } from '../doctor/prescriptions/create-prescription/create-prescription.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateAdminPrescriptionComponent } from './prescriptions/create-prescription/create-prescription.component';
import { InvoiceListingComponent } from './invoices/invoice-listing/invoice-listing.component';
import { AddInvoiceComponent } from './invoices/add-invoice/add-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'doctors',
        children: [
          { path: '', component: DoctorListComponent },
          { path: 'add', component: CreateDoctorComponent },
          { path: 'edit/:id', component: CreateDoctorComponent }
        ]
      },
      {
        path: 'patients',
        children: [
          { path: '', component: PatientListComponent },
          { path: ':id', component: AddPatientComponent },
          { path: 'patients/edit-patient', component: AddPatientComponent }, // Reuse component
        ]
      },
      {
        path: 'appointments',
        children: [
          { path: '', component: AppointmentListComponent },
          { path: ':id', component: CreateAppointmentComponent }
        ]
      },
      {
        path: 'prescriptions',
        children: [
          { path: '', component: PrescriptionListComponent },
          { path: 'add', component: CreateAdminPrescriptionComponent },
          { path: 'edit/:id', component: CreatePrescriptionComponent }
        ]
      },
      {
        path: 'invoices',
        children: [
          { path: '', component: InvoiceListingComponent },
          { path: 'add', component: AddInvoiceComponent },
          { path: 'edit/:id', component: AddInvoiceComponent }
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
