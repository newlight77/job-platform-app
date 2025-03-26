// Domain types for recommendation context

export interface JobRecommendation {
  id: string;
  jobOfferId: string;
  seekerId: string;
  matchScore: number;
  matchReasons: MatchReason[];
  status: 'NEW' | 'VIEWED' | 'SAVED' | 'APPLIED' | 'DISMISSED';
  createdAt: string;
  updatedAt: string;
}

export interface MatchReason {
  type: 'SKILL' | 'LOCATION' | 'EXPERIENCE' | 'EDUCATION' | 'INDUSTRY' | 'JOB_TYPE' | 'SALARY';
  score: number;
  description: string;
}

export interface RecommendationPreferences {
  seekerId: string;
  prioritizeSkills: boolean;
  prioritizeLocation: boolean;
  prioritizeSalary: boolean;
  excludeAppliedJobs: boolean;
  excludeRejectedJobs: boolean;
  minimumMatchScore: number;
  updatedAt: string;
}

export interface SeekerProfileMatch {
  seekerId: string;
  jobOfferId: string;
  matchScore: number;
  skillMatches: {
    skill: string;
    relevance: number;
  }[];
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  createdAt: string;
}
