export interface Survey {
  id: number;
  name: string;
  description: string;
  status: 'NEW' | 'ASSIGNED' | 'COMPLETED';
  created_by?: number;
}
