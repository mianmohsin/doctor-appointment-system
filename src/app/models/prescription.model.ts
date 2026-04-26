export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
}

export interface Prescription {
  id: number;
  prescription_no: string;
  medication: string;
  diagnosis: string;
  status: string;
  issued_date: string;
  patient: Patient;
  doctor_id: number; // In a real app, you'd have a doctor object here too
}
