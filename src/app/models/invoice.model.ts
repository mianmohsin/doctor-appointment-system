export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
}

export interface Doctor {
  id: number; // The '?' makes it optional, so "Create" won't error out
  name: string;
  email: string;
  phone: string;
}

export interface Invoice {
  id: number;
  invoice_no: string;
  patient_name: string;
  patient_image: string;
  doctor_name: string;
  date_issued: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Cancelled';
}

export interface BillingStats {
  total_revenue: number;
  pending_amount: number;
  cancelled_amount: number;
}
