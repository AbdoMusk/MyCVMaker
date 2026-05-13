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

export type Language = 'en' | 'fr';

export type SectionTitleKey =
  | 'aboutMe'
  | 'workExperience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'contact'
  | 'languages'
  | 'softSkills';

export interface ThemeColors {
  preset: string;
  primary: string;
  secondary: string;
  accent: string;
  accentSecondary: string;
  sidebarBg: string;
  useGradient: boolean;
}

export type ImageShape = 'circle' | 'square' | 'rounded' | 'hexagon' | 'faded';

export interface ImageStyle {
  shape: ImageShape;
  zoom: number;     // 1.0 - 3.0
  offsetX: number;  // -100 to 100 (percent)
  offsetY: number;  // -100 to 100 (percent)
  border: boolean;  // show white border around frame (when shape supports it)
}

export interface CVSettings {
  language: Language;
  theme: ThemeColors;
  customTitles: Partial<Record<SectionTitleKey, string>>;
  imageStyle: ImageStyle;
}

export interface CVData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  settings: CVSettings;
}

// Translations for section titles and common UI labels
export const TRANSLATIONS: Record<Language, Record<SectionTitleKey, string> & {
  present: string;
  nativeFluent: string;
  advanced: string;
  intermediate: string;
  basic: string;
  gpa: string;
}> = {
  en: {
    aboutMe: 'About Me',
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    certifications: 'Certifications',
    projects: 'Projects',
    contact: 'Contact',
    languages: 'Languages',
    softSkills: 'Soft Skills',
    present: 'Present',
    nativeFluent: 'Native/Fluent',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
    basic: 'Basic',
    gpa: 'GPA',
  },
  fr: {
    aboutMe: 'À Propos',
    workExperience: 'Expérience Professionnelle',
    education: 'Formation',
    skills: 'Compétences',
    certifications: 'Certifications',
    projects: 'Projets',
    contact: 'Contact',
    languages: 'Langues',
    softSkills: 'Qualités Personnelles',
    present: 'Présent',
    nativeFluent: 'Natif/Courant',
    advanced: 'Avancé',
    intermediate: 'Intermédiaire',
    basic: 'Basique',
    gpa: 'Moyenne',
  },
};

// Color theme presets — each can be solid or gradient between primary/secondary
export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  accentSecondary: string;
  sidebarBg: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db',
    accentSecondary: '#2ecc71',
    sidebarBg: '#2c3e50',
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    primary: '#4c1d95',
    secondary: '#7c3aed',
    accent: '#a855f7',
    accentSecondary: '#ec4899',
    sidebarBg: '#4c1d95',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primary: '#064e3b',
    secondary: '#047857',
    accent: '#10b981',
    accentSecondary: '#84cc16',
    sidebarBg: '#064e3b',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    primary: '#7f1d1d',
    secondary: '#b91c1c',
    accent: '#ef4444',
    accentSecondary: '#f97316',
    sidebarBg: '#7f1d1d',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primary: '#7c2d12',
    secondary: '#c2410c',
    accent: '#f97316',
    accentSecondary: '#facc15',
    sidebarBg: '#7c2d12',
  },
  {
    id: 'teal',
    name: 'Teal',
    primary: '#134e4a',
    secondary: '#0f766e',
    accent: '#14b8a6',
    accentSecondary: '#06b6d4',
    sidebarBg: '#134e4a',
  },
  {
    id: 'slate',
    name: 'Slate',
    primary: '#0f172a',
    secondary: '#334155',
    accent: '#64748b',
    accentSecondary: '#94a3b8',
    sidebarBg: '#0f172a',
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    primary: '#881337',
    secondary: '#be123c',
    accent: '#f43f5e',
    accentSecondary: '#fb923c',
    sidebarBg: '#881337',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    primary: '#1e1b4b',
    secondary: '#3730a3',
    accent: '#6366f1',
    accentSecondary: '#8b5cf6',
    sidebarBg: '#1e1b4b',
  },
  {
    id: 'forest',
    name: 'Forest',
    primary: '#14532d',
    secondary: '#166534',
    accent: '#22c55e',
    accentSecondary: '#a3e635',
    sidebarBg: '#14532d',
  },
];

export const defaultSettings: CVSettings = {
  language: 'en',
  theme: {
    preset: 'blue',
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db',
    accentSecondary: '#2ecc71',
    sidebarBg: '#2c3e50',
    useGradient: true,
  },
  customTitles: {},
  imageStyle: {
    shape: 'circle',
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    border: true,
  },
};

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
  settings: defaultSettings,
};

export function resolveSectionTitle(
  key: SectionTitleKey,
  settings: CVSettings,
): string {
  const custom = settings.customTitles?.[key];
  if (custom && custom.trim()) return custom;
  return TRANSLATIONS[settings.language][key];
}
