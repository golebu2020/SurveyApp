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

export interface SurveyAssignment {
  id: number;
  survey_id: number;
  assigned_to: number;
  assigned_by: number;
  status: 'NEW' | 'ASSIGNED' | 'COMPLETED';
  created_at: string;
  updated_at: string;
}
