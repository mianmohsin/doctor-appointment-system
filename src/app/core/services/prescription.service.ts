import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private apiUrl = 'http://127.0.0.1:8000/api/prescriptions';

  constructor(private http: HttpClient) {}

  getPrescriptions(page: number = 1, search: string = '', status: string = ''): Observable<any> {
  // If status is "All Status", send an empty string to the API
  const statusParam = status === 'All Status' ? '' : status;

  return this.http.get(`${this.apiUrl}?page=${page}&search=${search}&status=${statusParam}`);
}

}
