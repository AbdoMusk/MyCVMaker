'use client';

import React from 'react';
import { useCV } from '../context/CVContext';

// Helper function to format date
const formatDate = (dateStr: string, showMonth = true): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01');
  if (showMonth) {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return date.getFullYear().toString();
};

// Icons
const EmailIcon = () => (
  <svg className="cv-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="cv-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="cv-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="cv-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg className="cv-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
  </svg>
);

const GraduationIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
);

const CertIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

const ProjectIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/>
  </svg>
);

const UserIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

// Section Title Component with Icon
const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) => (
  <div className="cv-styled-section-title">
    <div className="cv-section-icon-wrapper">
      {icon}
    </div>
    <h2>{children}</h2>
  </div>
);

export default function CVPreview() {
  const { cvData } = useCV();
  const {
    personalInfo,
    professionalSummary,
    workExperience,
    education,
    skills,
    certifications,
    projects,
  } = cvData;

  const technicalSkills = skills.filter((s) => s.category === 'technical' && s.name);
  const softSkills = skills.filter((s) => s.category === 'soft' && s.name);
  const languages = skills.filter((s) => s.category === 'language' && s.name);

  return (
    <div className="cv-styled-page" id="cv-content">
      {/* Decorative Header Background */}
      <div className="cv-header-bg"></div>
      
      {/* Main Content */}
      <div className="cv-content-wrapper">
        {/* Left Sidebar */}
        <aside className="cv-sidebar">
          {/* Profile Image */}
          <div className="cv-profile-section">
            <div className="cv-profile-image-wrapper">
              {personalInfo.profileImage ? (
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.fullName}
                  className="cv-profile-image"
                />
              ) : (
                <div className="cv-profile-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">Contact</h3>
            <div className="cv-contact-list">
              {personalInfo.email && (
                <div className="cv-contact-item">
                  <EmailIcon />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="cv-contact-item">
                  <PhoneIcon />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="cv-contact-item">
                  <LocationIcon />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="cv-contact-item">
                  <LinkedInIcon />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="cv-contact-item">
                  <WebsiteIcon />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(technicalSkills.length > 0 || softSkills.length > 0) && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">Skills</h3>
              <div className="cv-skills-list">
                {technicalSkills.map((skill) => (
                  <div key={skill.id} className="cv-skill-item">
                    <span className="cv-skill-name">{skill.name}</span>
                    <div className="cv-skill-bar">
                      <div 
                        className="cv-skill-fill" 
                        style={{ width: skill.level === 'expert' ? '100%' : skill.level === 'advanced' ? '80%' : skill.level === 'intermediate' ? '60%' : '40%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">Languages</h3>
              <div className="cv-languages-list">
                {languages.map((lang) => (
                  <div key={lang.id} className="cv-language-item">
                    <span>{lang.name}</span>
                    <span className="cv-language-level">
                      {lang.level === 'expert' ? 'Native/Fluent' : 
                       lang.level === 'advanced' ? 'Advanced' : 
                       lang.level === 'intermediate' ? 'Intermediate' : 'Basic'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {softSkills.length > 0 && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">Soft Skills</h3>
              <div className="cv-soft-skills">
                {softSkills.map((skill) => (
                  <span key={skill.id} className="cv-soft-skill-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="cv-main">
          {/* Header */}
          <header className="cv-main-header">
            <h1 className="cv-name">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="cv-job-title">{personalInfo.jobTitle || 'Professional Title'}</p>
          </header>

          {/* Professional Summary */}
          {professionalSummary && (
            <section className="cv-main-section">
              <SectionTitle icon={<UserIcon />}>About Me</SectionTitle>
              <p className="cv-summary-text">{professionalSummary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && workExperience.some(exp => exp.jobTitle || exp.company) && (
            <section className="cv-main-section">
              <SectionTitle icon={<BriefcaseIcon />}>Work Experience</SectionTitle>
              <div className="cv-timeline">
                {workExperience.map((exp) => (
                  (exp.jobTitle || exp.company) && (
                    <div key={exp.id} className="cv-timeline-item">
                      <div className="cv-timeline-dot"></div>
                      <div className="cv-timeline-content">
                        <div className="cv-timeline-header">
                          <div>
                            <h4 className="cv-timeline-title">{exp.jobTitle}</h4>
                            <p className="cv-timeline-subtitle">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                          </div>
                          <span className="cv-timeline-date">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        {exp.achievements.filter(a => a).length > 0 && (
                          <ul className="cv-timeline-list">
                            {exp.achievements.filter(a => a).map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && education.some(edu => edu.degree || edu.institution) && (
            <section className="cv-main-section">
              <SectionTitle icon={<GraduationIcon />}>Education</SectionTitle>
              <div className="cv-timeline">
                {education.map((edu) => (
                  (edu.degree || edu.institution) && (
                    <div key={edu.id} className="cv-timeline-item">
                      <div className="cv-timeline-dot"></div>
                      <div className="cv-timeline-content">
                        <div className="cv-timeline-header">
                          <div>
                            <h4 className="cv-timeline-title">{edu.degree}</h4>
                            <p className="cv-timeline-subtitle">{edu.institution}{edu.location && ` • ${edu.location}`}</p>
                            {edu.gpa && <p className="cv-timeline-meta">GPA: {edu.gpa}</p>}
                          </div>
                          <span className="cv-timeline-date">{formatDate(edu.graduationDate)}</span>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications.some(cert => cert.name) && (
            <section className="cv-main-section">
              <SectionTitle icon={<CertIcon />}>Certifications</SectionTitle>
              <div className="cv-certs-grid">
                {certifications.map((cert) => (
                  cert.name && (
                    <div key={cert.id} className="cv-cert-card">
                      <span className="cv-cert-name">{cert.name}</span>
                      <span className="cv-cert-issuer">{cert.issuer}</span>
                      {cert.date && <span className="cv-cert-date">{formatDate(cert.date)}</span>}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && projects.some(proj => proj.name) && (
            <section className="cv-main-section">
              <SectionTitle icon={<ProjectIcon />}>Projects</SectionTitle>
              <div className="cv-projects-list">
                {projects.map((proj) => (
                  proj.name && (
                    <div key={proj.id} className="cv-project-card">
                      <h4 className="cv-project-name">{proj.name}</h4>
                      {proj.description && <p className="cv-project-desc">{proj.description}</p>}
                      {proj.technologies && (
                        <div className="cv-project-tech">
                          {proj.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="cv-tech-tag">{tech.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
