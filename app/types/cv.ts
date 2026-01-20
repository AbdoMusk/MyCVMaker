// CV Data Types - Following professional CV specialist recommendations

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  profileImage?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevantCourses?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
    profileImage: '',
  },
  professionalSummary: 'Results-driven Software Engineer with 8+ years of experience designing, developing, and implementing scalable applications and solutions. Proven track record of leading cross-functional teams and delivering projects on time. Strong expertise in full-stack development, cloud architecture, and agile methodologies.',
  workExperience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      achievements: [
        'Led development of microservices architecture reducing system latency by 40%',
        'Mentored team of 5 junior developers, improving code quality by 30%',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
      ],
    },
    {
      id: '2',
      jobTitle: 'Software Engineer',
      company: 'Digital Solutions Corp',
      location: 'Los Angeles, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      achievements: [
        'Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime',
        'Optimized database queries resulting in 50% faster page load times',
        'Collaborated with product team to deliver 15+ features ahead of schedule',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: '2018-05',
      gpa: '3.8/4.0',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript/TypeScript', category: 'technical', level: 'expert' },
    { id: '2', name: 'React/Next.js', category: 'technical', level: 'expert' },
    { id: '3', name: 'Node.js', category: 'technical', level: 'advanced' },
    { id: '4', name: 'Python', category: 'technical', level: 'advanced' },
    { id: '5', name: 'AWS/Cloud Services', category: 'technical', level: 'advanced' },
    { id: '6', name: 'SQL/NoSQL Databases', category: 'technical', level: 'advanced' },
    { id: '7', name: 'Leadership', category: 'soft' },
    { id: '8', name: 'Problem Solving', category: 'soft' },
    { id: '9', name: 'English', category: 'language', level: 'expert' },
    { id: '10', name: 'Spanish', category: 'language', level: 'intermediate' },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a scalable e-commerce platform handling 10K+ concurrent users',
      technologies: 'React, Node.js, PostgreSQL, Redis',
    },
  ],
};
