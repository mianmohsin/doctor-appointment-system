import { Component } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-listing',
  standalone: false,
  templateUrl: './invoice-listing.component.html',
  styleUrl: './invoice-listing.component.css'
})
export class InvoiceListingComponent {

invoices: any[] = [];
  stats: any = { total_revenue: 0, pending_amount: 0, cancelled_amount: 0 };

  searchTerm: string = '';
  selectedStatus: string = '';
  currentPage: number = 1;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.loadInvoices();
    this.loadStats();
  }

  onSearch() {
    this.currentPage = 1; // Reset to page 1 when filtering
    this.loadInvoices();
  }

 loadInvoices() {
    this.invoiceService.getInvoices(this.currentPage, this.searchTerm, this.selectedStatus)
      .subscribe((res: any) => {
        this.invoices = res.data;
        // Update your pagination variables here (lastPage, total, etc)
      });
  }

  loadStats() {
    this.invoiceService.getStats().subscribe(res => this.stats = res);
  }

  deleteInvoice(id: number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          // Remove from local array to update UI instantly
          this.invoices = this.invoices.filter(inv => inv.id !== id);
          this.loadStats(); // Refresh stats
        },
        error: () => alert('Error deleting invoice')
      });
    }
  }

  // Example data (this would come from your table row)
  printInvoice(invoice: any) {
    const printWindow = window.open('', '_blank');

    // Inline CSS for the best print results
    const styles = `
      <style>
        @media print { .no-print { display: none; } }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; margin: 0; padding: 40px; }
        .invoice-box { max-width: 800px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .logo { font-size: 28px; font-weight: 900; color: #4f46e5; letter-spacing: -1px; }
        .invoice-details { text-align: right; }
        .invoice-details h1 { margin: 0; font-size: 32px; color: #1e293b; }
        .billing-info { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .info-label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .info-value { font-weight: 700; color: #334155; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th { background: #f8fafc; text-align: left; padding: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; }
        td { padding: 15px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .total-section { margin-left: auto; width: 250px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .grand-total { background: #1e293b; color: white; padding: 15px; border-radius: 12px; margin-top: 15px; display: flex; justify-content: space-between; font-weight: 900; font-size: 18px; }
        .footer-note { margin-top: 50px; border-top: 1px solid #f1f5f9; pt: 20px; font-size: 11px; color: #94a3b8; text-align: center; }
      </style>
    `;

    const htmlContent = `
      <html>
        <head><title>Invoice ${invoice.id}</title>${styles}</head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <div class="logo">MEDCORE</div>
              <div class="invoice-details">
                <h1>INVOICE</h1>
                <p class="info-value">#${invoice.id}</p>
              </div>
            </div>

            <div class="billing-info">
              <div>
                <p class="info-label">Billed To</p>
                <p class="info-value">${invoice.patient}</p>
                <p style="font-size:12px; color:#64748b;">Patient Record Verified</p>
              </div>
              <div style="text-align: right;">
                <p class="info-label">Date Issued</p>
                <p class="info-value">${invoice.date}</p>
                <p class="info-label" style="margin-top:15px;">Assigned Doctor</p>
                <p class="info-value">${invoice.doctor}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align:center;">Qty</th>
                  <th style="text-align:right;">Price</th>
                  <th style="text-align:right;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Medical Consultation - Professional Service</td>
                  <td style="text-align:center;">1</td>
                  <td style="text-align:right;">$100.00</td>
                  <td style="text-align:right; font-weight:700;">$100.00</td>
                </tr>
                <tr>
                  <td>Lab Services - Comprehensive Panel</td>
                  <td style="text-align:center;">1</td>
                  <td style="text-align:right;">$20.00</td>
                  <td style="text-align:right; font-weight:700;">$20.00</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-row"><span>Subtotal</span><span>$120.00</span></div>
              <div class="total-row"><span>Tax (5%)</span><span>$6.00</span></div>
              <div class="grand-total">
                <span>Total</span>
                <span>$126.00</span>
              </div>
            </div>

            <div class="footer-note">
              <p>Thank you for choosing Medcore Health Services. Please keep this for your insurance records.</p>
              <p><strong>medcore.com | +1 555-010-999</strong></p>
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;

    printWindow?.document.write(htmlContent);
    printWindow?.document.close();
  }

}
