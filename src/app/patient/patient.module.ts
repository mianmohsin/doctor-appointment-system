import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientRoutingModule } from './patient-routing.module';

import { PatientSidebarComponent } from './shared/patient-sidebar/patient-sidebar.component';
import { PatientHeaderComponent } from './shared/patient-header/patient-header.component';
import { PatientLayoutComponent } from './shared/patient-layout/patient-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PatientSidebarComponent,
    PatientHeaderComponent,
    PatientLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PatientRoutingModule
  ]
})
export class PatientModule {}
