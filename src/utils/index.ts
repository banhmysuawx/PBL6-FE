export interface Company {
  id: Number;
  category_name: string;
  company_name: string;
  salary: number;
  established_date: string;
  skills: [];
  company_location: string;
  profile_description: string;
  image: string;
}

export interface Job {
  id: Number;
  name: string;
  image: string;
  salary: string;
  skills: Number[];
  category_name: string;
  locations_name: string[];
}
export const status = {
  1: "apply",
  2: "test",
  3: "set_schedule",
  4: "interview_pending",
  5: "schedule_interview",
  6: "cancel_interview",
  7: "interview_complete",
  8: "complete",
  9: "incomplete",
};
export interface Comment {
  rating?: Number;
  comment?: string;
  company: Number;
  user: Number;
  created_at?: Date;
  author?: string;
}
export const formatDate = (date: Date | string) => {
  console.log(date);
  return `${date}`.replace(/\.\d+/, "");
};
