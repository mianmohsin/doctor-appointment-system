import { Component } from '@angular/core';

@Component({
  selector: 'app-create-prescription',
  standalone: false,
  templateUrl: './create-prescription.component.html',
  styleUrl: './create-prescription.component.css'
})
export class CreateAdminPrescriptionComponent {

  services = [
    { name: 'Doctor Consultation', qty: 1, price: 50 },
    { name: 'Blood Test', qty: 1, price: 30 },
    { name: 'X-Ray', qty: 1, price: 40 }
  ];

  get subtotal() {
    return this.services.reduce((sum, item) => sum + (item.qty * item.price), 0);
  }

  get tax() {
    return this.subtotal * 0.05;
  }

  get total() {
    return this.subtotal + this.tax;
  }

}
