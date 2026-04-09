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
import { InsuranceDashboardComponent } from './insurance/insurance-dashboard/insurance-dashboard.component';
import { ClaimStatusComponent } from './insurance/claims/claim-status/claim-status.component';
import { ClaimListComponent } from './insurance/claims/claim-list/claim-list.component';
import { ClaimDocumentsComponent } from './insurance/claims/claim-documents/claim-documents.component';
import { CreateClaimComponent } from './insurance/claims/create-claim/create-claim.component';
import { EmailComposeComponent } from './insurance/communications/email-compose/email-compose.component';
import { EmailHistoryComponent } from './insurance/communications/email-history/email-history.component';
import { PolicyDetailsComponent } from './insurance/policies/policy-details/policy-details.component';
import { PolicyListComponent } from './insurance/policies/policy-list/policy-list.component';
import { ProviderListComponent } from './insurance/providers/provider-list/provider-list.component';
import { CreateProviderComponent } from './insurance/providers/create-provider/create-provider.component';
import { CreatePolicyComponent } from './insurance/policies/create-policy/create-policy.component';

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
        path: 'insurance',
        children: [
          { path: 'dashboard', component: InsuranceDashboardComponent },
          {
            path: 'claim',
            children: [
              { path: 'claim-list', component: ClaimListComponent },
              { path: 'create', component: CreateClaimComponent },
              { path: 'claim/:id', component: CreateClaimComponent },
              { path: 'status', component: ClaimStatusComponent },
              { path: 'documents', component: ClaimDocumentsComponent }
            ]
          },
          {
            path: 'communication',
            children: [
              { path: 'email-compose', component: EmailComposeComponent },
              { path: 'email-history', component: EmailHistoryComponent }
            ]
          },
          {
            path: 'policies',
            children: [
              { path: 'create-policy', component: CreatePolicyComponent },
              { path: 'policy-detail', component: PolicyDetailsComponent },
              { path: 'policy-list', component: PolicyListComponent }
            ]
          },
          {
            path: 'providers',
            children: [
              { path: 'create', component: CreateProviderComponent },
              { path: 'provider-list', component: ProviderListComponent }
            ]
          }
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
