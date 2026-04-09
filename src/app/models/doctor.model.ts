export interface Doctor {
  id?: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience_years: number;
  status: 'active' | 'inactive';
  created_at?: string;
}
