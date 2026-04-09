import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-insurance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-insurance.component.html',
  styleUrl: './my-insurance.component.css'
})
export class MyInsuranceComponent {

  // Track which tab is open
  activeTab: 'claims' | 'invoices' = 'claims';

  switchTab(tab: 'claims' | 'invoices') {
    this.activeTab = tab;
  }

  // Mock data for Invoices (Match your previous UI image)
  invoices = [
    { id: 'INV-001', date: '01 Apr 2026', doctor: 'Dr. Ahmed', amount: 126.00, status: 'PAID' },
    { id: 'INV-002', date: '02 Apr 2026', doctor: 'Dr. Ali', amount: 80.00, status: 'PENDING' }
  ];

  // Modal State
  isPolicyModalOpen: boolean = false;

  // Mock Policy Data
  selectedPolicy = {
    company: 'EFU Health Insurance',
    policyNo: '#POL-882901-X',
    type: 'Family Premium Plus',
    startDate: 'Jan 01, 2024',
    endDate: 'Dec 31, 2024',
    limit: '$100,000',
    deductible: '$500',
    premium: '$142/mo',
    status: 'ACTIVE',
    coveredMembers: ['Muhammad Mohsin (Primary)', 'Sarah Mohsin (Spouse)', 'Zayan Mohsin (Child)']
  };

  togglePolicyModal() {
    this.isPolicyModalOpen = !this.isPolicyModalOpen;
  }

}
