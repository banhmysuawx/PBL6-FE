export const userId = 8;
import { notification } from "ant-design-vue";
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
  apply: "waiting for a reply from company",
  test: "Please do test",
  set_schedule: "Set schedule",
  interview_pending: "waiting for the scheduling interview from company",
  schedule_interview: "Please schedule interview",
  cancel_interview: "Cancel interview",
  interview_complete: "Interview complete",
  complete: "Pass",
  incomplete: "Fail",
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
export interface Education {
  certificate_degree_name: string;
  major: string;
  university_name?: string;
  starting_date?: string;
  completion_date?: string;
  gpa?: number;
  seeker: number;
}
export interface Experience {
  is_current_job?: boolean;
  job_title: string;
  company_name?: string;
  job_location?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  seeker: Number;
}
export interface Skill {
  skill_name: string;
  skill_level: string;
  seeker: Number;
}
export interface Process {
  status_do_apply: string;
  status_do_test: string;
  status_do_interview: string;
  status_result: string;
}
export const formatTime = (date: string) => {
  return new Date(date).toLocaleDateString("sv-SE");
};
export const openNotification = (message: string) => {
  notification.open({
    message: "API error",
    description: message,
    style: {
      width: "600px",
      marginLeft: `${335 - 600}px`,
    },
  });
};
