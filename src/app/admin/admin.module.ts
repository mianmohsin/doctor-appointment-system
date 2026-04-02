import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

// Components
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
import { CreateAdminPrescriptionComponent } from './prescriptions/create-prescription/create-prescription.component';
import { AdminSidebarComponent } from './shared/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoiceListingComponent } from './invoices/invoice-listing/invoice-listing.component';
import { AddInvoiceComponent } from './invoices/add-invoice/add-invoice.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DoctorListComponent,
    CreateDoctorComponent,
    PatientListComponent,
    AddPatientComponent,
    AppointmentListComponent,
    PrescriptionListComponent,
    CreateAdminPrescriptionComponent,
    AdminProfileComponent,
    SettingsComponent,
    InvoiceListingComponent,
    AddInvoiceComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {}
