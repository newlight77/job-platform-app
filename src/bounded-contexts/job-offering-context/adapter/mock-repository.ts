// Mock implementation of the JobOfferingRepository
import { JobOffer, JobApplication } from '../domain/types';
import { JobOfferingRepository } from '../domain/repository';

// Mock data
const mockJobOffers: JobOffer[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    requirements: ['3+ years of React experience', 'TypeScript knowledge', 'CSS/SCSS proficiency'],
    responsibilities: ['Develop user interfaces', 'Collaborate with designers', 'Write clean, maintainable code'],
    employmentType: 'FULL_TIME',
    remote: true,
    postedDate: '2025-03-20',
    contactEmail: 'jobs@techcorp.com',
    status: 'PUBLISHED',
    createdBy: 'user123',
    updatedAt: '2025-03-20'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'New York',
    description: 'Join our backend team to build scalable APIs and services.',
    requirements: ['Node.js experience', 'Database knowledge', 'API design skills'],
    responsibilities: ['Design and implement APIs', 'Optimize database queries', 'Ensure high performance'],
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD'
    },
    employmentType: 'FULL_TIME',
    remote: false,
    postedDate: '2025-03-22',
    contactEmail: 'careers@datasystems.com',
    status: 'PUBLISHED',
    createdBy: 'user456',
    updatedAt: '2025-03-22'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    location: 'San Francisco',
    description: 'Looking for a versatile developer who can work on both frontend and backend.',
    requirements: ['JavaScript proficiency', 'React experience', 'Node.js knowledge'],
    responsibilities: ['Develop full-stack applications', 'Implement features end-to-end', 'Optimize performance'],
    employmentType: 'FULL_TIME',
    remote: false,
    postedDate: '2025-03-24',
    deadline: '2025-04-24',
    contactEmail: 'hr@websolutions.com',
    status: 'PUBLISHED',
    createdBy: 'user789',
    updatedAt: '2025-03-24'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    description: 'Help us build and maintain our cloud infrastructure.',
    requirements: ['AWS experience', 'Docker and Kubernetes knowledge', 'CI/CD pipeline experience'],
    responsibilities: ['Manage cloud infrastructure', 'Implement CI/CD pipelines', 'Monitor system performance'],
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD'
    },
    employmentType: 'FULL_TIME',
    remote: true,
    postedDate: '2025-03-25',
    contactEmail: 'jobs@cloudtech.io',
    status: 'PUBLISHED',
    createdBy: 'user101',
    updatedAt: '2025-03-25'
  }
];

const mockJobApplications: JobApplication[] = [];

export class MockJobOfferingRepository implements JobOfferingRepository {
  async getJobOffers(): Promise<JobOffer[]> {
    return [...mockJobOffers];
  }

  async getJobOfferById(id: string): Promise<JobOffer | null> {
    const jobOffer = mockJobOffers.find(job => job.id === id);
    return jobOffer ? { ...jobOffer } : null;
  }

  async createJobOffer(jobOffer: Omit<JobOffer, 'id' | 'createdBy' | 'updatedAt'>): Promise<JobOffer> {
    const newJobOffer: JobOffer = {
      ...jobOffer as any,
      id: `${mockJobOffers.length + 1}`,
      createdBy: 'current-user', // In a real app, this would come from auth context
      updatedAt: new Date().toISOString(),
      status: 'PUBLISHED'
    };
    
    mockJobOffers.push(newJobOffer);
    return { ...newJobOffer };
  }

  async updateJobOffer(id: string, jobOffer: Partial<JobOffer>): Promise<JobOffer | null> {
    const index = mockJobOffers.findIndex(job => job.id === id);
    if (index === -1) return null;
    
    mockJobOffers[index] = {
      ...mockJobOffers[index],
      ...jobOffer,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockJobOffers[index] };
  }

  async deleteJobOffer(id: string): Promise<boolean> {
    const index = mockJobOffers.findIndex(job => job.id === id);
    if (index === -1) return false;
    
    mockJobOffers.splice(index, 1);
    return true;
  }

  async searchJobOffers(query: string): Promise<JobOffer[]> {
    const lowercaseQuery = query.toLowerCase();
    return mockJobOffers.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.requirements.some(req => req.toLowerCase().includes(lowercaseQuery)) ||
      job.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getApplicationsForJob(jobOfferId: string): Promise<JobApplication[]> {
    return mockJobApplications.filter(app => app.jobOfferId === jobOfferId);
  }

  async getApplicationsForSeeker(seekerId: string): Promise<JobApplication[]> {
    return mockJobApplications.filter(app => app.seekerId === seekerId);
  }

  async createApplication(application: Omit<JobApplication, 'id' | 'appliedDate' | 'updatedAt'>): Promise<JobApplication> {
    const newApplication: JobApplication = {
      ...application as any,
      id: `app-${mockJobApplications.length + 1}`,
      appliedDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'PENDING'
    };
    
    mockJobApplications.push(newApplication);
    return { ...newApplication };
  }

  async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication | null> {
    const index = mockJobApplications.findIndex(app => app.id === id);
    if (index === -1) return null;
    
    mockJobApplications[index] = {
      ...mockJobApplications[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockJobApplications[index] };
  }
}
