export const userId = 8;
import { notification } from "ant-design-vue";
export interface Company {
  id: any;
  category_name: string;
  company_name: string;
  salary: number;
  established_date: string;
  skills: [];
  company_location: string;
  profile_description: string;
  image: string;
  average_rating: any;
}

export interface Job {
  id: Number;
  name: string;
  image: string;
  salary: string;
  skills: any;
  description: string;
  category_name: string;
  locations: any;
  company: {
    company_name: string;
    company_location: string;
    description: string;
    image: string;
  };
}
export const status = {
  apply: "waiting for a reply from company",
  test: "Please do test",
  set_schedule: "Waiting for the scheduling interview from company",
  interview_pending: "Please schedule interview",
  schedule_interview: "Waiting for interview",
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
export interface Account {
  email: string;
  password: string;
  password2: string;
  date_of_birth: string;
  gender: string;
  role: string;
}
export interface JobDetail {
  company: {
    id: Number;
    company_location: string;
    company_name: string;
    established_date: string;
    image: string;
  };
  descriptiong: string;
  is_active: boolean;
  locations: [];
  name: string;
  salary: string;
  skills: [];
}

export interface AccountView {
  username: string;
  role: string;
  gender: string;
  email: string;
  updated_at: string;
  is_active: string;
  created_at: string;
}
