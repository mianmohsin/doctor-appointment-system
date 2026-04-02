import { Routes } from '@angular/router';
import { AdminAuthComponent } from './admin-auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then(m => m.DoctorModule)
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'admin/login',
    component: AdminAuthComponent,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
