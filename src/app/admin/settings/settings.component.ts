import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  // Doctor System State
  doctor = {
    autoVerify: true,
    commRate: 15,
    slotGap: 10, // minutes between appointments
    cancelPolicy: '24h',
    allowVideo: true,
    maxAdvanceBooking: 90, // days
    payoutCycle: 'Weekly'
  };
  patient = {
    selfSignup: true,
    emailVerify: true,
    familyProfiles: false,
    privacyLevel: 'Strict',
    allowChat: true,
    smsAlerts: true,
    billingCurrency: 'USD'
  };
  system = {
    maintenanceMode: false,
    googleLogin: true,
    darkModeDefault: false,
    auditRetention: 365 // days
  };


  save() {
    console.log('Deep System Update Triggered');
  }

  activeTab: 'overview' | 'doctors' | 'patients' = 'overview';
  setTab(tab: 'overview' | 'doctors' | 'patients') {
    this.activeTab = tab;
  }

}
