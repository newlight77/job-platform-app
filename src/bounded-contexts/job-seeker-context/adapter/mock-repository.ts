// Mock implementation of the JobSeekerRepository
import { JobSeeker, JobPreferences, WorkExperience, Education, Certification, Language } from '../domain/types';
import { JobSeekerRepository } from '../domain/repository';

// Mock data
const mockJobSeekers: JobSeeker[] = [
  {
    id: '1',
    userId: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    title: 'Frontend Developer',
    summary: 'Experienced frontend developer with 5 years of experience in React and TypeScript.',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    experience: [
      {
        id: 'exp1',
        company: 'TechCorp',
        title: 'Frontend Developer',
        location: 'Remote',
        startDate: '2020-01-01',
        endDate: '2023-01-01',
        current: false,
        description: 'Developed and maintained web applications using React and TypeScript.',
        skills: ['React', 'TypeScript', 'Redux']
      },
      {
        id: 'exp2',
        company: 'WebSolutions',
        title: 'Junior Developer',
        location: 'New York',
        startDate: '2018-01-01',
        endDate: '2019-12-31',
        current: false,
        description: 'Worked on frontend development using JavaScript and jQuery.',
        skills: ['JavaScript', 'jQuery', 'CSS']
      }
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2014-09-01',
        endDate: '2018-06-30',
        current: false,
        description: 'Focused on web development and software engineering.'
      }
    ],
    certifications: [
      {
        id: 'cert1',
        name: 'React Developer Certification',
        issuingOrganization: 'React Academy',
        issueDate: '2019-05-15',
        credentialId: 'REACT-123456',
        credentialUrl: 'https://reactacademy.com/verify/REACT-123456'
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'NATIVE'
      },
      {
        language: 'Spanish',
        proficiency: 'INTERMEDIATE'
      }
    ],
    preferences: {
      jobTypes: ['FULL_TIME', 'CONTRACT'],
      locations: ['New York', 'Remote'],
      remoteOnly: true,
      salaryExpectation: {
        min: 90000,
        max: 120000,
        currency: 'USD'
      },
      industries: ['Technology', 'Finance'],
      jobTitles: ['Frontend Developer', 'UI Developer', 'React Developer'],
      technologies: ['React', 'TypeScript', 'JavaScript'],
      relocationWilling: false,
      availableFrom: '2023-02-01'
    },
    resumeUrl: 'https://example.com/resumes/john-doe-resume.pdf',
    profilePictureUrl: 'https://example.com/profiles/john-doe.jpg',
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15'
  },
  {
    id: '2',
    userId: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1987654321',
    title: 'Backend Engineer',
    summary: 'Experienced backend engineer with expertise in Node.js, Python, and database design.',
    skills: ['Node.js', 'Python', 'MongoDB', 'SQL', 'Express', 'API Design'],
    experience: [
      {
        id: 'exp3',
        company: 'DataSystems',
        title: 'Backend Engineer',
        location: 'San Francisco',
        startDate: '2019-03-01',
        endDate: undefined,
        current: true,
        description: 'Developing and maintaining RESTful APIs and microservices using Node.js and MongoDB.',
        skills: ['Node.js', 'MongoDB', 'Express', 'Microservices']
      },
      {
        id: 'exp4',
        company: 'CodeCorp',
        title: 'Software Developer',
        location: 'Boston',
        startDate: '2017-06-01',
        endDate: '2019-02-28',
        current: false,
        description: 'Worked on full-stack development with a focus on backend systems.',
        skills: ['Python', 'Django', 'PostgreSQL']
      }
    ],
    education: [
      {
        id: 'edu2',
        institution: 'Tech University',
        degree: 'Master of Science',
        fieldOfStudy: 'Software Engineering',
        startDate: '2015-09-01',
        endDate: '2017-05-30',
        current: false
      },
      {
        id: 'edu3',
        institution: 'State University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2011-09-01',
        endDate: '2015-05-30',
        current: false
      }
    ],
    certifications: [
      {
        id: 'cert2',
        name: 'AWS Certified Developer',
        issuingOrganization: 'Amazon Web Services',
        issueDate: '2020-08-10',
        expirationDate: '2023-08-10',
        credentialId: 'AWS-DEV-123456'
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'NATIVE'
      },
      {
        language: 'French',
        proficiency: 'ADVANCED'
      }
    ],
    preferences: {
      jobTypes: ['FULL_TIME'],
      locations: ['San Francisco', 'Seattle', 'Remote'],
      remoteOnly: false,
      salaryExpectation: {
        min: 110000,
        max: 150000,
        currency: 'USD'
      },
      industries: ['Technology', 'Healthcare', 'Finance'],
      jobTitles: ['Backend Engineer', 'Software Engineer', 'Node.js Developer'],
      technologies: ['Node.js', 'Python', 'MongoDB', 'AWS'],
      relocationWilling: true
    },
    resumeUrl: 'https://example.com/resumes/jane-smith-resume.pdf',
    profilePictureUrl: 'https://example.com/profiles/jane-smith.jpg',
    createdAt: '2023-01-10',
    updatedAt: '2023-02-05'
  },
  {
    id: '3',
    userId: 'user3',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1122334455',
    title: 'Full Stack Developer',
    summary: 'Versatile full stack developer with experience in React, Node.js, and cloud technologies.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    experience: [
      {
        id: 'exp5',
        company: 'WebSolutions',
        title: 'Full Stack Developer',
        location: 'Remote',
        startDate: '2020-05-01',
        endDate: undefined,
        current: true,
        description: 'Developing full-stack web applications using React, Node.js, and MongoDB.',
        skills: ['React', 'Node.js', 'MongoDB', 'Express']
      },
      {
        id: 'exp6',
        company: 'AppTech',
        title: 'Frontend Developer',
        location: 'Chicago',
        startDate: '2018-07-01',
        endDate: '2020-04-30',
        current: false,
        description: 'Developed responsive web applications using React and Redux.',
        skills: ['React', 'Redux', 'JavaScript', 'CSS']
      }
    ],
    education: [
      {
        id: 'edu4',
        institution: 'Coding Bootcamp',
        degree: 'Certificate',
        fieldOfStudy: 'Full Stack Web Development',
        startDate: '2018-01-01',
        endDate: '2018-06-30',
        current: false,
        description: 'Intensive 6-month program covering full stack web development.'
      },
      {
        id: 'edu5',
        institution: 'City College',
        degree: 'Bachelor of Arts',
        fieldOfStudy: 'Business Administration',
        startDate: '2013-09-01',
        endDate: '2017-05-30',
        current: false
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'NATIVE'
      }
    ],
    preferences: {
      jobTypes: ['FULL_TIME', 'CONTRACT', 'FREELANCE'],
      locations: ['Chicago', 'Remote'],
      remoteOnly: true,
      industries: ['Technology', 'E-commerce', 'Education'],
      jobTitles: ['Full Stack Developer', 'JavaScript Developer', 'MERN Stack Developer'],
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
      relocationWilling: false,
      availableFrom: '2023-03-01'
    },
    resumeUrl: 'https://example.com/resumes/alex-johnson-resume.pdf',
    createdAt: '2023-01-20',
    updatedAt: '2023-02-10'
  },
  {
    id: '4',
    userId: 'user4',
    firstName: 'Sam',
    lastName: 'Wilson',
    email: 'sam.wilson@example.com',
    phone: '+1567890123',
    title: 'DevOps Engineer',
    summary: 'Experienced DevOps engineer with expertise in cloud infrastructure, CI/CD, and containerization.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins', 'Linux'],
    experience: [
      {
        id: 'exp7',
        company: 'CloudTech',
        title: 'DevOps Engineer',
        location: 'Remote',
        startDate: '2019-08-01',
        endDate: undefined,
        current: true,
        description: 'Managing cloud infrastructure and implementing CI/CD pipelines.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
      },
      {
        id: 'exp8',
        company: 'InfraSolutions',
        title: 'System Administrator',
        location: 'Seattle',
        startDate: '2017-03-01',
        endDate: '2019-07-31',
        current: false,
        description: 'Managed Linux servers and implemented automation scripts.',
        skills: ['Linux', 'Bash', 'Python', 'Ansible']
      }
    ],
    education: [
      {
        id: 'edu6',
        institution: 'Technical Institute',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Information Technology',
        startDate: '2013-09-01',
        endDate: '2017-05-30',
        current: false
      }
    ],
    certifications: [
      {
        id: 'cert3',
        name: 'AWS Certified DevOps Engineer',
        issuingOrganization: 'Amazon Web Services',
        issueDate: '2020-05-20',
        expirationDate: '2023-05-20',
        credentialId: 'AWS-DEVOPS-789012'
      },
      {
        id: 'cert4',
        name: 'Certified Kubernetes Administrator',
        issuingOrganization: 'Cloud Native Computing Foundation',
        issueDate: '2021-02-15',
        credentialId: 'CKA-123456'
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'NATIVE'
      },
      {
        language: 'German',
        proficiency: 'BEGINNER'
      }
    ],
    preferences: {
      jobTypes: ['FULL_TIME', 'CONTRACT'],
      locations: ['Seattle', 'Portland', 'Remote'],
      remoteOnly: true,
      salaryExpectation: {
        min: 120000,
        max: 160000,
        currency: 'USD'
      },
      industries: ['Technology', 'Cloud Services'],
      jobTitles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      relocationWilling: false
    },
    resumeUrl: 'https://example.com/resumes/sam-wilson-resume.pdf',
    profilePictureUrl: 'https://example.com/profiles/sam-wilson.jpg',
    createdAt: '2023-01-05',
    updatedAt: '2023-02-15'
  }
];

export class MockJobSeekerRepository implements JobSeekerRepository {
  async getJobSeekers(): Promise<JobSeeker[]> {
    return [...mockJobSeekers];
  }

  async getJobSeekerById(id: string): Promise<JobSeeker | null> {
    const jobSeeker = mockJobSeekers.find(seeker => seeker.id === id);
    return jobSeeker ? { ...jobSeeker } : null;
  }

  async createJobSeeker(jobSeeker: Omit<JobSeeker, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobSeeker> {
    const newJobSeeker: JobSeeker = {
      ...jobSeeker as any,
      id: `${mockJobSeekers.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockJobSeekers.push(newJobSeeker);
    return { ...newJobSeeker };
  }

  async updateJobSeeker(id: string, jobSeeker: Partial<JobSeeker>): Promise<JobSeeker | null> {
    const index = mockJobSeekers.findIndex(seeker => seeker.id === id);
    if (index === -1) return null;
    
    mockJobSeekers[index] = {
      ...mockJobSeekers[index],
      ...jobSeeker,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockJobSeekers[index] };
  }

  async deleteJobSeeker(id: string): Promise<boolean> {
    const index = mockJobSeekers.findIndex(seeker => seeker.id === id);
    if (index === -1) return false;
    
    mockJobSeekers.splice(index, 1);
    return true;
  }

  async searchJobSeekers(query: string): Promise<JobSeeker[]> {
    const lowercaseQuery = query.toLowerCase();
    return mockJobSeekers.filter(seeker => 
      seeker.firstName.toLowerCase().includes(lowercaseQuery) ||
      seeker.lastName.toLowerCase().includes(lowercaseQuery) ||
      seeker.title.toLowerCase().includes(lowercaseQuery) ||
      seeker.summary.toLowerCase().includes(lowercaseQuery) ||
      seeker.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getJobPreferences(seekerId: string): Promise<JobPreferences> {
    const jobSeeker = mockJobSeekers.find(seeker => seeker.id === seekerId);
    if (!jobSeeker) {
      throw new Error(`Job seeker with ID ${seekerId} not found`);
    }
    
    return { ...jobSeeker.preferences };
  }

  async updateJobPreferences(seekerId: string, preferences: Partial<JobPreferences>): Promise<JobPreferences> {
    const index = mockJobSeekers.findIndex(seeker => seeker.id === seekerId);
    if (index === -1) {
      throw new Error(`Job seeker with ID ${seekerId} not found`);
    }
    
    mockJobSeekers[index].preferences = {
      ...mockJobSeekers[index].preferences,
      ...preferences
    };
    
    mockJobSeekers[index].updatedAt = new Date().toISOString();
    
    return { ...mockJobSeekers[index].preferences };
  }

  async uploadResume(seekerId: string, resumeUrl: string): Promise<JobSeeker> {
    const index = mockJobSeekers.findIndex(seeker => seeker.id === seekerId);
    if (index === -1) {
      throw new Error(`Job seeker with ID ${seekerId} not found`);
    }
    
    mockJobSeekers[index].resumeUrl = resumeUrl;
    mockJobSeekers[index].updatedAt = new Date().toISOString();
    
    return { ...mockJobSeekers[index] };
  }
}
