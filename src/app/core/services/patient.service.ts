import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private apiUrl = 'http://127.0.0.1:8000/api/patients';

  constructor(private http: HttpClient) {}

  // 1. GET all patient
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePatient(id: number): Observable<any> {
    // Ensure only ONE slash between patients and id
    return this.http.delete(`http://127.0.0.1:8000/api/patients/${id}`);
  }

}
