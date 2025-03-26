// Domain types for job offering context

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min?: number;
    max?: number;
    currency: string;
  };
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';
  remote: boolean;
  postedDate: string;
  deadline?: string;
  contactEmail: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  createdBy: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobOfferId: string;
  seekerId: string;
  resumeUrl: string;
  coverLetter?: string;
  status: 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
  appliedDate: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  industry: string;
  size?: string;
  logoUrl?: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
