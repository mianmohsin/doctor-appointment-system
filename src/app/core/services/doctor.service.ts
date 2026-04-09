import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://127.0.0.1:8000/api/doctors';

  constructor(private http: HttpClient) {}

  // 1. GET all doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  // 2. GET one doctor
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  // 3. POST create doctor
  createDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  // 4. PUT update doctor
  updateDoctor(id: number, doctor: Partial<Doctor>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  // 5. DELETE doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
