export interface AddResourceSchema {
  name: string;
  description: string;
  capacity: number;
  resource_type_id: string;
  google_calender_id: string;
  is_active: boolean;
  dept_id: string;
}
