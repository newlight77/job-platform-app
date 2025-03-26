// Mock implementation of the RecommendationRepository
import { JobRecommendation, SeekerProfileMatch, RecommendationPreferences, MatchReason } from '../domain/types';
import { RecommendationRepository } from '../domain/repository';
import { MockJobOfferingRepository } from '../../job-offering-context/adapter/mock-repository';
import { MockJobSeekerRepository } from '../../job-seeker-context/adapter/mock-repository';
import { JobOffer } from '../../job-offering-context/domain/types';
import { JobSeeker } from '../../job-seeker-context/domain/types';

// Mock data
const mockJobRecommendations: JobRecommendation[] = [
  {
    id: '1',
    jobOfferId: '1',
    seekerId: '1',
    matchScore: 85,
    matchReasons: [
      {
        type: 'SKILL',
        score: 90,
        description: 'You have 4 matching skills: React, TypeScript, CSS, JavaScript'
      },
      {
        type: 'LOCATION',
        score: 100,
        description: 'Remote job matches your preference for remote work'
      },
      {
        type: 'JOB_TYPE',
        score: 100,
        description: 'Full-time position matches your preference'
      }
    ],
    status: 'NEW',
    createdAt: '2025-03-25',
    updatedAt: '2025-03-25'
  },
  {
    id: '2',
    jobOfferId: '3',
    seekerId: '1',
    matchScore: 75,
    matchReasons: [
      {
        type: 'SKILL',
        score: 80,
        description: 'You have 3 matching skills: React, JavaScript, CSS'
      },
      {
        type: 'LOCATION',
        score: 0,
        description: 'San Francisco does not match your preference for remote work'
      },
      {
        type: 'JOB_TYPE',
        score: 100,
        description: 'Full-time position matches your preference'
      }
    ],
    status: 'NEW',
    createdAt: '2025-03-25',
    updatedAt: '2025-03-25'
  },
  {
    id: '3',
    jobOfferId: '2',
    seekerId: '2',
    matchScore: 90,
    matchReasons: [
      {
        type: 'SKILL',
        score: 95,
        description: 'You have 3 matching skills: Node.js, API Design, Database knowledge'
      },
      {
        type: 'LOCATION',
        score: 80,
        description: 'New York is in your preferred locations'
      },
      {
        type: 'SALARY',
        score: 90,
        description: 'Salary range matches your expectations'
      }
    ],
    status: 'VIEWED',
    createdAt: '2025-03-25',
    updatedAt: '2025-03-25'
  },
  {
    id: '4',
    jobOfferId: '4',
    seekerId: '4',
    matchScore: 95,
    matchReasons: [
      {
        type: 'SKILL',
        score: 100,
        description: 'You have 4 matching skills: AWS, Docker, Kubernetes, CI/CD'
      },
      {
        type: 'LOCATION',
        score: 100,
        description: 'Remote job matches your preference for remote work'
      },
      {
        type: 'SALARY',
        score: 90,
        description: 'Salary range matches your expectations'
      }
    ],
    status: 'SAVED',
    createdAt: '2025-03-25',
    updatedAt: '2025-03-25'
  }
];

const mockSeekerProfileMatches: SeekerProfileMatch[] = [
  {
    seekerId: '1',
    jobOfferId: '1',
    matchScore: 85,
    skillMatches: [
      { skill: 'React', relevance: 90 },
      { skill: 'TypeScript', relevance: 85 },
      { skill: 'CSS', relevance: 70 },
      { skill: 'JavaScript', relevance: 80 }
    ],
    experienceMatch: 80,
    locationMatch: 100,
    salaryMatch: 75,
    createdAt: '2025-03-25'
  },
  {
    seekerId: '3',
    jobOfferId: '1',
    matchScore: 70,
    skillMatches: [
      { skill: 'React', relevance: 90 },
      { skill: 'JavaScript', relevance: 80 }
    ],
    experienceMatch: 60,
    locationMatch: 100,
    salaryMatch: 0,
    createdAt: '2025-03-25'
  },
  {
    seekerId: '2',
    jobOfferId: '2',
    matchScore: 90,
    skillMatches: [
      { skill: 'Node.js', relevance: 95 },
      { skill: 'MongoDB', relevance: 85 },
      { skill: 'API Design', relevance: 90 }
    ],
    experienceMatch: 90,
    locationMatch: 80,
    salaryMatch: 90,
    createdAt: '2025-03-25'
  }
];

const mockRecommendationPreferences: RecommendationPreferences[] = [
  {
    seekerId: '1',
    prioritizeSkills: true,
    prioritizeLocation: true,
    prioritizeSalary: false,
    excludeAppliedJobs: true,
    excludeRejectedJobs: true,
    minimumMatchScore: 60,
    updatedAt: '2025-03-25'
  },
  {
    seekerId: '2',
    prioritizeSkills: true,
    prioritizeLocation: false,
    prioritizeSalary: true,
    excludeAppliedJobs: true,
    excludeRejectedJobs: false,
    minimumMatchScore: 70,
    updatedAt: '2025-03-25'
  }
];

export class MockRecommendationRepository implements RecommendationRepository {
  private jobOfferingRepo = new MockJobOfferingRepository();
  private jobSeekerRepo = new MockJobSeekerRepository();
  
  async getRecommendationsForSeeker(seekerId: string): Promise<JobRecommendation[]> {
    return mockJobRecommendations.filter(rec => rec.seekerId === seekerId);
  }
  
  async updateRecommendationStatus(id: string, status: JobRecommendation['status']): Promise<JobRecommendation | null> {
    const index = mockJobRecommendations.findIndex(rec => rec.id === id);
    if (index === -1) return null;
    
    mockJobRecommendations[index] = {
      ...mockJobRecommendations[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockJobRecommendations[index] };
  }
  
  async generateRecommendationsForSeeker(seekerId: string): Promise<JobRecommendation[]> {
    // In a real implementation, this would use an algorithm to match jobs to the seeker
    // For this mock, we'll simulate generating new recommendations
    
    const seeker = await this.jobSeekerRepo.getJobSeekerById(seekerId);
    if (!seeker) throw new Error(`Job seeker with ID ${seekerId} not found`);
    
    const allJobs = await this.jobOfferingRepo.getJobOffers();
    const existingRecommendations = mockJobRecommendations.filter(rec => rec.seekerId === seekerId);
    const existingJobIds = new Set(existingRecommendations.map(rec => rec.jobOfferId));
    
    // Find jobs that haven't been recommended yet
    const newJobs = allJobs.filter(job => !existingJobIds.has(job.id));
    
    // Generate recommendations for new jobs
    const newRecommendations: JobRecommendation[] = [];
    
    for (const job of newJobs) {
      const matchScore = this.calculateMatchScore(seeker, job);
      if (matchScore >= 60) { // Only recommend if match score is above threshold
        const recommendation: JobRecommendation = {
          id: `rec-${mockJobRecommendations.length + newRecommendations.length + 1}`,
          jobOfferId: job.id,
          seekerId: seekerId,
          matchScore,
          matchReasons: this.generateMatchReasons(seeker, job),
          status: 'NEW',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        newRecommendations.push(recommendation);
      }
    }
    
    // Add new recommendations to mock data
    mockJobRecommendations.push(...newRecommendations);
    
    // Return all recommendations for the seeker
    return [...existingRecommendations, ...newRecommendations];
  }
  
  async getMatchingProfilesForJob(jobOfferId: string): Promise<SeekerProfileMatch[]> {
    return mockSeekerProfileMatches.filter(match => match.jobOfferId === jobOfferId);
  }
  
  async generateMatchingProfilesForJob(jobOfferId: string): Promise<SeekerProfileMatch[]> {
    // In a real implementation, this would use an algorithm to match seekers to the job
    // For this mock, we'll simulate generating new matches
    
    const job = await this.jobOfferingRepo.getJobOfferById(jobOfferId);
    if (!job) throw new Error(`Job offer with ID ${jobOfferId} not found`);
    
    const allSeekers = await this.jobSeekerRepo.getJobSeekers();
    const existingMatches = mockSeekerProfileMatches.filter(match => match.jobOfferId === jobOfferId);
    const existingSeekerIds = new Set(existingMatches.map(match => match.seekerId));
    
    // Find seekers that haven't been matched yet
    const newSeekers = allSeekers.filter(seeker => !existingSeekerIds.has(seeker.id));
    
    // Generate matches for new seekers
    const newMatches: SeekerProfileMatch[] = [];
    
    for (const seeker of newSeekers) {
      const matchScore = this.calculateMatchScore(seeker, job);
      if (matchScore >= 60) { // Only match if score is above threshold
        const match: SeekerProfileMatch = {
          seekerId: seeker.id,
          jobOfferId: jobOfferId,
          matchScore,
          skillMatches: this.generateSkillMatches(seeker, job),
          experienceMatch: this.calculateExperienceMatch(seeker, job),
          locationMatch: this.calculateLocationMatch(seeker, job),
          salaryMatch: this.calculateSalaryMatch(seeker, job),
          createdAt: new Date().toISOString()
        };
        
        newMatches.push(match);
      }
    }
    
    // Add new matches to mock data
    mockSeekerProfileMatches.push(...newMatches);
    
    // Return all matches for the job
    return [...existingMatches, ...newMatches];
  }
  
  async getRecommendationPreferences(seekerId: string): Promise<RecommendationPreferences> {
    const preferences = mockRecommendationPreferences.find(pref => pref.seekerId === seekerId);
    
    if (!preferences) {
      // Return default preferences if none exist
      return {
        seekerId,
        prioritizeSkills: true,
        prioritizeLocation: true,
        prioritizeSalary: false,
        excludeAppliedJobs: true,
        excludeRejectedJobs: true,
        minimumMatchScore: 60,
        updatedAt: new Date().toISOString()
      };
    }
    
    return { ...preferences };
  }
  
  async updateRecommendationPreferences(seekerId: string, preferences: Partial<RecommendationPreferences>): Promise<RecommendationPreferences> {
    const index = mockRecommendationPreferences.findIndex(pref => pref.seekerId === seekerId);
    
    if (index === -1) {
      // Create new preferences if none exist
      const newPreferences: RecommendationPreferences = {
        seekerId,
        prioritizeSkills: preferences.prioritizeSkills ?? true,
        prioritizeLocation: preferences.prioritizeLocation ?? true,
        prioritizeSalary: preferences.prioritizeSalary ?? false,
        excludeAppliedJobs: preferences.excludeAppliedJobs ?? true,
        excludeRejectedJobs: preferences.excludeRejectedJobs ?? true,
        minimumMatchScore: preferences.minimumMatchScore ?? 60,
        updatedAt: new Date().toISOString()
      };
      
      mockRecommendationPreferences.push(newPreferences);
      return { ...newPreferences };
    }
    
    // Update existing preferences
    mockRecommendationPreferences[index] = {
      ...mockRecommendationPreferences[index],
      ...preferences,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockRecommendationPreferences[index] };
  }
  
  // Helper methods for matching algorithm
  
  private calculateMatchScore(seeker: JobSeeker, job: JobOffer): number {
    // This is a simplified matching algorithm
    // In a real implementation, this would be more sophisticated
    
    const skillScore = this.calculateSkillScore(seeker, job);
    const locationScore = this.calculateLocationMatch(seeker, job);
    const jobTypeScore = this.calculateJobTypeMatch(seeker, job);
    const salaryScore = this.calculateSalaryMatch(seeker, job);
    
    // Weight the scores based on importance
    const weightedScore = (
      (skillScore * 0.5) +
      (locationScore * 0.2) +
      (jobTypeScore * 0.2) +
      (salaryScore * 0.1)
    );
    
    return Math.round(weightedScore);
  }
  
  private calculateSkillScore(seeker: JobSeeker, job: JobOffer): number {
    const seekerSkills = new Set(seeker.skills.map(s => s.toLowerCase()));
    
    // Extract skills from job requirements and responsibilities
    const jobSkills = new Set([
      ...job.requirements.flatMap(req => this.extractKeywords(req)),
      ...job.responsibilities.flatMap(resp => this.extractKeywords(resp))
    ]);
    
    // Count matching skills
    let matchCount = 0;
    for (const skill of seekerSkills) {
      if (jobSkills.has(skill)) {
        matchCount++;
      }
    }
    
    // Calculate score based on percentage of matching skills
    const maxSkills = Math.max(seekerSkills.size, jobSkills.size);
    return (matchCount / maxSkills) * 100;
  }
  
  private calculateLocationMatch(seeker: JobSeeker, job: JobOffer): number {
    // If job is remote and seeker prefers remote, perfect match
    if (job.remote && seeker.preferences.remoteOnly) {
      return 100;
    }
    
    // If job is remote but seeker doesn't prefer remote only, still good match
    if (job.remote && !seeker.preferences.remoteOnly) {
      return 80;
    }
    
    // If seeker prefers remote only but job is not remote, poor match
    if (!job.remote && seeker.preferences.remoteOnly) {
      return 0;
    }
    
    // Check if job location is in seeker's preferred locations
    const jobLocation = job.location.toLowerCase();
    const seekerLocations = seeker.preferences.locations.map(loc => loc.toLowerCase());
    
    if (seekerLocations.some(loc => jobLocation.includes(loc) || loc.includes(jobLocation))) {
      return 100;
    }
    
    // If seeker is willing to relocate, partial match
    if (seeker.preferences.relocationWilling) {
      return 50;
    }
    
    return 0;
  }
  
  private calculateJobTypeMatch(seeker: JobSeeker, job: JobOffer): number {
    if (seeker.preferences.jobTypes.includes(job.employmentType)) {
      return 100;
    }
    return 0;
  }
  
  private calculateSalaryMatch(seeker: JobSeeker, job: JobOffer): number {
    // If either doesn't specify salary, can't compare
    if (!job.salary || !seeker.preferences.salaryExpectation) {
      return 50; // Neutral score
    }
    
    const jobMin = job.salary.min || 0;
    const jobMax = job.salary.max || jobMin * 1.5; // Estimate max if not provided
    
    const seekerMin = seeker.preferences.salaryExpectation.min;
    const seekerMax = seeker.preferences.salaryExpectation.max || seekerMin * 1.5; // Estimate max if not provided
    
    // Different currencies, can't compare accurately
    if (job.salary.currency !== seeker.preferences.salaryExpectation.currency) {
      return 50; // Neutral score
    }
    
    // Check for overlap in salary ranges
    if (jobMax < seekerMin) {
      // Job pays less than seeker's minimum
      return 0;
    }
    
    if (jobMin > seekerMax) {
      // Job pays more than seeker's maximum (usually not a problem, but might be overqualified)
      return 70;
    }
    
    // There's overlap in the ranges, calculate how well they match
    const overlapStart = Math.max(jobMin, seekerMin);
    const overlapEnd = Math.min(jobMax, seekerMax);
    const overlapSize = overlapEnd - overlapStart;
    
    const seekerRange = seekerMax - seekerMin;
    const jobRange = jobMax - jobMin;
    
    // Calculate how much of each range is covered by the overlap
    const seekerCoverage = overlapSize / seekerRange;
    const jobCoverage = overlapSize / jobRange;
    
    // Average the coverage percentages and convert to a score
    return ((seekerCoverage + jobCoverage) / 2) * 100;
  }
  
  private calculateExperienceMatch(seeker: JobSeeker, job: JobOffer): number {
    // This is a simplified calculation
    // In a real implementation, this would analyze the experience more deeply
    
    if (!seeker.experience || seeker.experience.length === 0) {
      return 0;
    }
    
    // Calculate total years of experience
    const totalYears = seeker.experience.reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.current ? new Date() : exp.endDate ? new Date(exp.endDate) : new Date();
      const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return total + years;
    }, 0);
    
    // Assume job requires 0-5 years for entry level, 3-7 for mid-level, 5+ for senior
    // This is a simplification; in reality, would parse requirements for experience mentions
    if (job.title.toLowerCase().includes('senior') && totalYears >= 5) {
      return 100;
    } else if (job.title.toLowerCase().includes('senior') && totalYears >= 3) {
      return 70;
    } else if (job.title.toLowerCase().includes('senior') && totalYears < 3) {
      return 30;
    } else if (totalYears >= 3) {
      return 90;
    } else if (totalYears >= 1) {
      return 70;
    }
    
    return 50; // Default score for unclear experience requirements
  }
  
  private generateMatchReasons(seeker: JobSeeker, job: JobOffer): MatchReason[] {
    const reasons: MatchReason[] = [];
    
    // Skill match reason
    const seekerSkills = new Set(seeker.skills.map(s => s.toLowerCase()));
    const jobSkills = new Set([
      ...job.requirements.flatMap(req => this.extractKeywords(req)),
      ...job.responsibilities.flatMap(resp => this.extractKeywords(resp))
    ]);
    
    const matchingSkills = seeker.skills.filter(skill => 
      Array.from(jobSkills).some(jobSkill => 
        jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(jobSkill.toLowerCase())
      )
    );
    
    if (matchingSkills.length > 0) {
      const skillScore = (matchingSkills.length / Math.max(seekerSkills.size, jobSkills.size)) * 100;
      reasons.push({
        type: 'SKILL',
        score: Math.round(skillScore),
        description: `You have ${matchingSkills.length} matching skills: ${matchingSkills.slice(0, 4).join(', ')}${matchingSkills.length > 4 ? '...' : ''}`
      });
    }
    
    // Location match reason
    const locationScore = this.calculateLocationMatch(seeker, job);
    if (job.remote && seeker.preferences.remoteOnly) {
      reasons.push({
        type: 'LOCATION',
        score: locationScore,
        description: 'Remote job matches your preference for remote work'
      });
    } else if (job.remote && !seeker.preferences.remoteOnly) {
      reasons.push({
        type: 'LOCATION',
        score: locationScore,
        description: 'Job offers remote work option'
      });
    } else if (!job.remote && seeker.preferences.remoteOnly) {
      reasons.push({
        type: 'LOCATION',
        score: locationScore,
        description: 'On-site job does not match your preference for remote work'
      });
    } else {
      const jobLocation = job.location.toLowerCase();
      const seekerLocations = seeker.preferences.locations.map(loc => loc.toLowerCase());
      
      if (seekerLocations.some(loc => jobLocation.includes(loc) || loc.includes(jobLocation))) {
        reasons.push({
          type: 'LOCATION',
          score: locationScore,
          description: `${job.location} is in your preferred locations`
        });
      } else if (seeker.preferences.relocationWilling) {
        reasons.push({
          type: 'LOCATION',
          score: locationScore,
          description: `${job.location} is not in your preferred locations, but you are willing to relocate`
        });
      } else {
        reasons.push({
          type: 'LOCATION',
          score: locationScore,
          description: `${job.location} is not in your preferred locations`
        });
      }
    }
    
    // Job type match reason
    const jobTypeScore = this.calculateJobTypeMatch(seeker, job);
    if (jobTypeScore > 0) {
      reasons.push({
        type: 'JOB_TYPE',
        score: jobTypeScore,
        description: `${job.employmentType.replace('_', ' ').toLowerCase()} position matches your preference`
      });
    } else {
      reasons.push({
        type: 'JOB_TYPE',
        score: jobTypeScore,
        description: `${job.employmentType.replace('_', ' ').toLowerCase()} position does not match your preferences`
      });
    }
    
    // Salary match reason
    const salaryScore = this.calculateSalaryMatch(seeker, job);
    if (job.salary && seeker.preferences.salaryExpectation) {
      if (salaryScore >= 80) {
        reasons.push({
          type: 'SALARY',
          score: salaryScore,
          description: 'Salary range matches your expectations'
        });
      } else if (salaryScore >= 50) {
        reasons.push({
          type: 'SALARY',
          score: salaryScore,
          description: 'Salary range partially matches your expectations'
        });
      } else {
        reasons.push({
          type: 'SALARY',
          score: salaryScore,
          description: 'Salary range does not match your expectations'
        });
      }
    }
    
    return reasons;
  }
  
  private generateSkillMatches(seeker: JobSeeker, job: JobOffer): { skill: string; relevance: number }[] {
    const jobSkills = new Set([
      ...job.requirements.flatMap(req => this.extractKeywords(req)),
      ...job.responsibilities.flatMap(resp => this.extractKeywords(resp))
    ]);
    
    return seeker.skills
      .filter(skill => 
        Array.from(jobSkills).some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(jobSkill.toLowerCase())
        )
      )
      .map(skill => {
        // Calculate relevance based on how important the skill seems to be for the job
        // This is a simplified calculation
        const relevance = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
        return { skill, relevance };
      });
  }
  
  private extractKeywords(text: string): string[] {
    // This is a simplified keyword extraction
    // In a real implementation, this would use NLP techniques
    
    // Common tech skills to look for
    const commonSkills = [
      'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'express',
      'python', 'django', 'flask', 'java', 'spring', 'c#', '.net', 'php', 'laravel',
      'ruby', 'rails', 'go', 'rust', 'swift', 'kotlin', 'html', 'css', 'sass',
      'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'oracle', 'aws', 'azure',
      'gcp', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'git', 'agile', 'scrum'
    ];
    
    const words = text.toLowerCase().split(/\W+/);
    return words.filter(word => commonSkills.includes(word));
  }
}
