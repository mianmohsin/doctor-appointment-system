import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterDoctorComponent } from './register/register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './register/register-patient/register-patient.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        children: [
          { path: 'doctor', component: RegisterDoctorComponent },
          { path: 'patient', component: RegisterPatientComponent },
          { path: '', redirectTo: 'doctor', pathMatch: 'full' }
        ]
      },

      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
