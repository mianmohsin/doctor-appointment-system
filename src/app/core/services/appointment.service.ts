import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AppointmentService {

  private apiUrl = 'http://127.0.0.1:8000/api/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

}
