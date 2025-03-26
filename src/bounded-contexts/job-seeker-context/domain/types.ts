// Domain types for job seeker context

export interface JobSeeker {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  certifications?: Certification[];
  languages?: Language[];
  preferences: JobPreferences;
  resumeUrl?: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  language: string;
  proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
}

export interface JobPreferences {
  jobTypes: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP')[];
  locations: string[];
  remoteOnly: boolean;
  salaryExpectation?: {
    min: number;
    max?: number;
    currency: string;
  };
  industries: string[];
  jobTitles: string[];
  technologies: string[];
  relocationWilling: boolean;
  availableFrom?: string;
}
