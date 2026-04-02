import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterDoctorComponent } from './register/register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './register/register-patient/register-patient.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterDoctorComponent,
    RegisterPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
