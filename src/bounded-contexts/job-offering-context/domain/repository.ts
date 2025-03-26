// Job offering repository interface
import { JobOffer, JobApplication } from '../domain/types';

export interface JobOfferingRepository {
  // Job Offers
  getJobOffers(): Promise<JobOffer[]>;
  getJobOfferById(id: string): Promise<JobOffer | null>;
  createJobOffer(jobOffer: Omit<JobOffer, 'id' | 'createdBy' | 'updatedAt'>): Promise<JobOffer>;
  updateJobOffer(id: string, jobOffer: Partial<JobOffer>): Promise<JobOffer | null>;
  deleteJobOffer(id: string): Promise<boolean>;
  searchJobOffers(query: string): Promise<JobOffer[]>;
  
  // Job Applications
  getApplicationsForJob(jobOfferId: string): Promise<JobApplication[]>;
  getApplicationsForSeeker(seekerId: string): Promise<JobApplication[]>;
  createApplication(application: Omit<JobApplication, 'id' | 'appliedDate' | 'updatedAt'>): Promise<JobApplication>;
  updateApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication | null>;
}
