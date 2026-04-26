export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  gender?: string;
  // add other fields from postman if needed
}

export interface Doctor {
  id: number; // The '?' makes it optional, so "Create" won't error out
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
 id: number;
  appointment_no: string;
  appointment_date: string;
  type: string;
  status: string;
  doctor: Doctor;
  patient: Patient; // This is what was missing!
  notes?: string;
}
