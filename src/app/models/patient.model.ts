export interface DoctorInfo {
  doctor_name: string;
  specialty?: string;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  // This field comes from your backend JOIN query
  latest_appointment?: DoctorInfo;
}
