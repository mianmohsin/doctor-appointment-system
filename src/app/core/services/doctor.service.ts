import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://127.0.0.1:8000/api/doctors/';

  constructor(private http: HttpClient) {}

  // 1. GET all doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  // 2. GET one doctor
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`http://127.0.0.1:8000/api/doctors/${id}`);
  }

  // 3. POST create doctor
  createDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  // 4. PUT update doctor
  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/doctors/${id}`, data);
  }
  // 5. DELETE doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  getSpecialties(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/specialties');
  }

}
