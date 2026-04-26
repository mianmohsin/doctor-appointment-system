export interface Specialty {
  id: number;
  name: string;
}

export interface Doctor {
  id?: number; // The '?' makes it optional, so "Create" won't error out
  name: string;
  email: string;
  phone: string;
  gender?: string;        // Add these to match your payload
  license_id?: string;
  consultation_fee?: number;
  education?: string;
  bio?: string;
  photo?: string;
  status: string;

  // Add this part:
  specialties?: {
    id: number;
    name: string;
    pivot: {
      years_of_exp: number;
    };
  }[];
}
