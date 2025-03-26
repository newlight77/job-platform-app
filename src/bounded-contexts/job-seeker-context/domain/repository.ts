// Job seeker repository interface
import { JobSeeker, JobPreferences } from '../domain/types';

export interface JobSeekerRepository {
  // Job Seeker Profiles
  getJobSeekers(): Promise<JobSeeker[]>;
  getJobSeekerById(id: string): Promise<JobSeeker | null>;
  createJobSeeker(jobSeeker: Omit<JobSeeker, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobSeeker>;
  updateJobSeeker(id: string, jobSeeker: Partial<JobSeeker>): Promise<JobSeeker | null>;
  deleteJobSeeker(id: string): Promise<boolean>;
  searchJobSeekers(query: string): Promise<JobSeeker[]>;
  
  // Job Preferences
  getJobPreferences(seekerId: string): Promise<JobPreferences>;
  updateJobPreferences(seekerId: string, preferences: Partial<JobPreferences>): Promise<JobPreferences>;
  
  // Resume Management
  uploadResume(seekerId: string, resumeUrl: string): Promise<JobSeeker>;
}
