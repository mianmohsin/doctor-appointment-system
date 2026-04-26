import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class InvoiceService {

  private apiUrl = 'http://127.0.0.1:8000/api/invoices';

  constructor(private http: HttpClient) {}

  // getInvoices(page: number = 1, search: string = '', status: string = ''): Observable<any> {
  //   return this.http.get(`${this.apiUrl}?page=${page}&search=${search}&status=${status}`);
  // }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getInvoices(page: number = 1, search: string = '', status: string = '') {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search)
      .set('status', status);

    return this.http.get(this.apiUrl, { params });
  }

  // Functional Export: Returns a CSV or Excel file from the server
  exportInvoices(search: string = '', status: string = '') {
    const url = `${this.apiUrl}/export?search=${search}&status=${status}`;
    window.open(url, '_blank'); // Opens the download link in a new tab
  }

}
