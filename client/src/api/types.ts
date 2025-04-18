export interface Survey {
  id: number;
  name: string;
  description: string;
  status: 'NEW' | 'ASSIGNED' | 'COMPLETED';
  created_by?: number;
}

export interface Question {
  id: number;
  label: string;
  data_type: string;
  info: string;
  survey_id: number;
}

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'manager' | 'user';
}
