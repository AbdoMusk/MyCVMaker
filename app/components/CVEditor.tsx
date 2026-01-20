'use client';

import React from 'react';
import { useCV } from '../context/CVContext';
import { WorkExperience, Education, Skill, Certification, Project } from '../types/cv';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Input Field Component
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
    />
  </div>
);

// TextArea Component
const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
    />
  </div>
);

// Section Header Component
const SectionHeader = ({
  title,
  onAdd,
  addLabel = 'Add',
}: {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    {onAdd && (
      <button
        onClick={onAdd}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        + {addLabel}
      </button>
    )}
  </div>
);

// Collapsible Section Component
const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

// Personal Info Section
const PersonalInfoSection = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CollapsibleSection title="Personal Information">
      {/* Profile Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            {personalInfo.profileImage ? (
              <img 
                src={personalInfo.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 cursor-pointer transition-colors">
              Upload Photo
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {personalInfo.profileImage && (
              <button 
                onClick={() => updatePersonalInfo({ profileImage: '' })}
                className="px-3 py-1.5 text-red-500 text-sm hover:bg-red-50 rounded-md transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Recommended: Square image, at least 200x200px</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <InputField
            label="Full Name"
            value={personalInfo.fullName}
            onChange={(value) => updatePersonalInfo({ fullName: value })}
            placeholder="John Doe"
          />
        </div>
        <div className="col-span-2">
          <InputField
            label="Job Title"
            value={personalInfo.jobTitle}
            onChange={(value) => updatePersonalInfo({ jobTitle: value })}
            placeholder="Software Engineer"
          />
        </div>
        <InputField
          label="Email"
          value={personalInfo.email}
          onChange={(value) => updatePersonalInfo({ email: value })}
          placeholder="john@email.com"
          type="email"
        />
        <InputField
          label="Phone"
          value={personalInfo.phone}
          onChange={(value) => updatePersonalInfo({ phone: value })}
          placeholder="+1 (555) 123-4567"
          type="tel"
        />
        <InputField
          label="Location"
          value={personalInfo.location}
          onChange={(value) => updatePersonalInfo({ location: value })}
          placeholder="San Francisco, CA"
        />
        <InputField
          label="LinkedIn"
          value={personalInfo.linkedin || ''}
          onChange={(value) => updatePersonalInfo({ linkedin: value })}
          placeholder="linkedin.com/in/johndoe"
        />
        <div className="col-span-2">
          <InputField
            label="Website/Portfolio"
            value={personalInfo.website || ''}
            onChange={(value) => updatePersonalInfo({ website: value })}
            placeholder="johndoe.dev"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};

// Professional Summary Section
const ProfessionalSummarySection = () => {
  const { cvData, updateProfessionalSummary } = useCV();

  return (
    <CollapsibleSection title="Professional Summary">
      <TextAreaField
        label="Summary"
        value={cvData.professionalSummary}
        onChange={updateProfessionalSummary}
        placeholder="A brief 2-3 sentence summary of your professional background and key strengths..."
        rows={4}
      />
      <p className="text-xs text-gray-500 mt-1">
        Tip: Keep it concise (2-4 sentences). Highlight your years of experience, key skills, and career achievements.
      </p>
    </CollapsibleSection>
  );
};

// Work Experience Section
const WorkExperienceSection = () => {
  const { cvData, updateWorkExperience } = useCV();
  const { workExperience } = cvData;

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: generateId(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
    };
    updateWorkExperience([...workExperience, newExp]);
  };

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    updateWorkExperience(
      workExperience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const removeExperience = (id: string) => {
    updateWorkExperience(workExperience.filter((exp) => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    const exp = workExperience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, { achievements: [...exp.achievements, ''] });
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = workExperience.find((e) => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, { achievements: newAchievements });
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = workExperience.find((e) => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(expId, { achievements: newAchievements });
    }
  };

  return (
    <CollapsibleSection title="Work Experience">
      <SectionHeader title="" onAdd={addExperience} addLabel="Add Experience" />
      {workExperience.map((exp, idx) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Experience {idx + 1}</span>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Job Title"
              value={exp.jobTitle}
              onChange={(value) => updateExperience(exp.id, { jobTitle: value })}
              placeholder="Software Engineer"
            />
            <InputField
              label="Company"
              value={exp.company}
              onChange={(value) => updateExperience(exp.id, { company: value })}
              placeholder="Company Name"
            />
            <InputField
              label="Location"
              value={exp.location}
              onChange={(value) => updateExperience(exp.id, { location: value })}
              placeholder="City, State"
            />
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                Currently working here
              </label>
            </div>
            <InputField
              label="Start Date"
              value={exp.startDate}
              onChange={(value) => updateExperience(exp.id, { startDate: value })}
              placeholder="2021-03"
              type="month"
            />
            <InputField
              label="End Date"
              value={exp.current ? '' : exp.endDate}
              onChange={(value) => updateExperience(exp.id, { endDate: value })}
              placeholder="2023-12"
              type="month"
            />
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements/Responsibilities
              </label>
              <button
                onClick={() => addAchievement(exp.id)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                + Add
              </button>
            </div>
            {exp.achievements.map((achievement, aIdx) => (
              <div key={aIdx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(exp.id, aIdx, e.target.value)}
                  placeholder="Start with an action verb (e.g., Led, Developed, Increased)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {exp.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(exp.id, aIdx)}
                    className="px-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </CollapsibleSection>
  );
};

// Education Section
const EducationSection = () => {
  const { cvData, updateEducation } = useCV();
  const { education } = cvData;

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
    };
    updateEducation([...education, newEdu]);
  };

  const updateEdu = (id: string, updates: Partial<Education>) => {
    updateEducation(education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)));
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <CollapsibleSection title="Education">
      <SectionHeader title="" onAdd={addEducation} addLabel="Add Education" />
      {education.map((edu, idx) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Education {idx + 1}</span>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <InputField
                label="Degree"
                value={edu.degree}
                onChange={(value) => updateEdu(edu.id, { degree: value })}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <InputField
              label="Institution"
              value={edu.institution}
              onChange={(value) => updateEdu(edu.id, { institution: value })}
              placeholder="University Name"
            />
            <InputField
              label="Location"
              value={edu.location}
              onChange={(value) => updateEdu(edu.id, { location: value })}
              placeholder="City, State"
            />
            <InputField
              label="Graduation Date"
              value={edu.graduationDate}
              onChange={(value) => updateEdu(edu.id, { graduationDate: value })}
              type="month"
            />
            <InputField
              label="GPA (Optional)"
              value={edu.gpa || ''}
              onChange={(value) => updateEdu(edu.id, { gpa: value })}
              placeholder="3.8/4.0"
            />
          </div>
        </div>
      ))}
    </CollapsibleSection>
  );
};

// Skills Section
const SkillsSection = () => {
  const { cvData, updateSkills } = useCV();
  const { skills } = cvData;

  const addSkill = (category: Skill['category']) => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      category,
    };
    updateSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    updateSkills(skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)));
  };

  const removeSkill = (id: string) => {
    updateSkills(skills.filter((skill) => skill.id !== id));
  };

  const technicalSkills = skills.filter((s) => s.category === 'technical');
  const softSkills = skills.filter((s) => s.category === 'soft');
  const languages = skills.filter((s) => s.category === 'language');

  const SkillItem = ({ skill }: { skill: Skill }) => (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={skill.name}
        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
        placeholder="Skill name"
        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
      <button
        onClick={() => removeSkill(skill.id)}
        className="px-2 text-red-500 hover:text-red-700 text-lg"
      >
        ×
      </button>
    </div>
  );

  return (
    <CollapsibleSection title="Skills">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Technical Skills</label>
            <button
              onClick={() => addSkill('technical')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              + Add
            </button>
          </div>
          {technicalSkills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Soft Skills</label>
            <button
              onClick={() => addSkill('soft')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              + Add
            </button>
          </div>
          {softSkills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Languages</label>
            <button
              onClick={() => addSkill('language')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              + Add
            </button>
          </div>
          {languages.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
};

// Certifications Section
const CertificationsSection = () => {
  const { cvData, updateCertifications } = useCV();
  const { certifications } = cvData;

  const addCertification = () => {
    const newCert: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
    };
    updateCertifications([...certifications, newCert]);
  };

  const updateCert = (id: string, updates: Partial<Certification>) => {
    updateCertifications(
      certifications.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert))
    );
  };

  const removeCertification = (id: string) => {
    updateCertifications(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <CollapsibleSection title="Certifications" defaultOpen={false}>
      <SectionHeader title="" onAdd={addCertification} addLabel="Add Certification" />
      {certifications.map((cert, idx) => (
        <div key={cert.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Certification {idx + 1}</span>
            <button
              onClick={() => removeCertification(cert.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <InputField
                label="Certification Name"
                value={cert.name}
                onChange={(value) => updateCert(cert.id, { name: value })}
                placeholder="AWS Solutions Architect"
              />
            </div>
            <InputField
              label="Issuing Organization"
              value={cert.issuer}
              onChange={(value) => updateCert(cert.id, { issuer: value })}
              placeholder="Amazon Web Services"
            />
            <InputField
              label="Date"
              value={cert.date}
              onChange={(value) => updateCert(cert.id, { date: value })}
              type="month"
            />
          </div>
        </div>
      ))}
    </CollapsibleSection>
  );
};

// Projects Section
const ProjectsSection = () => {
  const { cvData, updateProjects } = useCV();
  const { projects } = cvData;

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: '',
    };
    updateProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateProjects(projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)));
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter((proj) => proj.id !== id));
  };

  return (
    <CollapsibleSection title="Projects" defaultOpen={false}>
      <SectionHeader title="" onAdd={addProject} addLabel="Add Project" />
      {projects.map((proj, idx) => (
        <div key={proj.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Project {idx + 1}</span>
            <button
              onClick={() => removeProject(proj.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <InputField
            label="Project Name"
            value={proj.name}
            onChange={(value) => updateProject(proj.id, { name: value })}
            placeholder="E-Commerce Platform"
          />
          <TextAreaField
            label="Description"
            value={proj.description}
            onChange={(value) => updateProject(proj.id, { description: value })}
            placeholder="Brief description of the project and your role"
            rows={2}
          />
          <InputField
            label="Technologies Used"
            value={proj.technologies}
            onChange={(value) => updateProject(proj.id, { technologies: value })}
            placeholder="React, Node.js, PostgreSQL"
          />
          <InputField
            label="Link (Optional)"
            value={proj.link || ''}
            onChange={(value) => updateProject(proj.id, { link: value })}
            placeholder="github.com/username/project"
          />
        </div>
      ))}
    </CollapsibleSection>
  );
};

// Main Editor Component
export default function CVEditor() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">CV Editor</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in your information below. Changes appear in real-time on the preview.
          </p>
        </div>
        <PersonalInfoSection />
        <ProfessionalSummarySection />
        <WorkExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
      </div>
    </div>
  );
}
