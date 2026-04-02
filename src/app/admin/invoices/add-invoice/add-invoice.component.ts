import { Component } from '@angular/core';

@Component({
  selector: 'app-add-invoice',
  standalone: false,
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {
invoice = {
    number: 'INV-' + Math.floor(Math.random() * 10000),
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    patientId: '',
    notes: '',
    tax: 5, // 5% tax
    discount: 0
  };

  // Dynamic Billing Items
  items = [
    { description: 'General Consultation', qty: 1, price: 80, total: 80 },
    { description: 'Lab Report - Blood Test', qty: 1, price: 40, total: 40 }
  ];

  addItem() {
    this.items.push({ description: '', qty: 1, price: 0, total: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  updateItemTotal(item: any) {
    item.total = item.qty * item.price;
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  getTaxAmount() {
    return (this.getSubtotal() * this.invoice.tax) / 100;
  }

  getGrandTotal() {
    return this.getSubtotal() + this.getTaxAmount() - this.invoice.discount;
  }

  saveInvoice() {
    console.log('Final Invoice Data:', { ...this.invoice, items: this.items });
  }
}
