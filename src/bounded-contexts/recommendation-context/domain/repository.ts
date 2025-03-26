// Repository interface for recommendation context
import { JobRecommendation, SeekerProfileMatch, RecommendationPreferences } from '../domain/types';

export interface RecommendationRepository {
  // Job Recommendations for Seekers
  getRecommendationsForSeeker(seekerId: string): Promise<JobRecommendation[]>;
  updateRecommendationStatus(id: string, status: JobRecommendation['status']): Promise<JobRecommendation | null>;
  generateRecommendationsForSeeker(seekerId: string): Promise<JobRecommendation[]>;
  
  // Seeker Recommendations for Job Offers
  getMatchingProfilesForJob(jobOfferId: string): Promise<SeekerProfileMatch[]>;
  generateMatchingProfilesForJob(jobOfferId: string): Promise<SeekerProfileMatch[]>;
  
  // Recommendation Preferences
  getRecommendationPreferences(seekerId: string): Promise<RecommendationPreferences>;
  updateRecommendationPreferences(seekerId: string, preferences: Partial<RecommendationPreferences>): Promise<RecommendationPreferences>;
}
