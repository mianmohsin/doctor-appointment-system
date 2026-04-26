// src/app/core/services/specialty.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpecialtyService {
  private apiUrl = 'http://127.0.0.1:8000/api/specialties';

  constructor(private http: HttpClient) { }

  getSpecialties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
