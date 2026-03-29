export interface User {
  id: number;
  name: string;
  email: string;
  role: 'candidate' | 'employer';
  email_verified_at: string | null;
  created_at: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number | null;
  company: string;
  employer: User;
  applications_count?: number;
  has_applied?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job: Job;
  candidate: User;
  cover_letter: string | null;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  applied_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'candidate' | 'employer';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface JobFilters {
  title?: string;
  location?: string;
  min_salary?: number;
  max_salary?: number;
  page?: number;
}

export interface UpdateApplicationStatus {
  applicationId: number;
  status: Application['status'];
}