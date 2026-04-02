import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorRoutingModule } from './doctor-routing.module';

import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail.component';
import { CreatePrescriptionComponent } from './prescriptions/create-prescription/create-prescription.component';
import { PrescriptionHistoryComponent } from './prescriptions/prescription-history/prescription-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DocterAppointmentComponent } from './appointments/docter-appointment/docter-appointment.component';
import { DoctorHeaderComponent } from './shared/doctor-header/doctor-header.component';
import { DoctorLayoutComponent } from './shared/doctor-layout/doctor-layout.component';
import { DoctorSidebarComponent } from './shared/doctor-sidebar/doctor-sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DocterAppointmentComponent,
    AppointmentDetailComponent,
    ScheduleComponent,
    CreatePrescriptionComponent,
    PrescriptionHistoryComponent,
    DoctorHeaderComponent,
    DoctorSidebarComponent,
    DoctorLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule {}
