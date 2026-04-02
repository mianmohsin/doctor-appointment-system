import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail.component';
import { CreatePrescriptionComponent } from './prescriptions/create-prescription/create-prescription.component';
import { PrescriptionHistoryComponent } from './prescriptions/prescription-history/prescription-history.component';
import { DocterAppointmentComponent } from './appointments/docter-appointment/docter-appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DoctorLayoutComponent } from './shared/doctor-layout/doctor-layout.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [

      // Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Appointments
      {
        path: 'appointments',
        children: [
          { path: '', component: DocterAppointmentComponent },
          { path: 'create-appointment/:id', component: CreateAppointmentComponent },
          { path: ':id', component: AppointmentDetailComponent }
        ]
      },

      // Schedule
      { path: 'schedule', component: ScheduleComponent },

      // Prescriptions
      {
        path: 'prescriptions',
        children: [
          { path: '', component: PrescriptionHistoryComponent },
          { path: 'create-prescription/:id', component: CreatePrescriptionComponent }
        ]
      },

      // Profile
      { path: 'my-profile', component: DoctorProfileComponent },

      // Default
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}
