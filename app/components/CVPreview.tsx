'use client';

import React, { useEffect } from 'react';
import { useCV } from '../context/CVContext';
import { CVSettings, SectionTitleKey, TRANSLATIONS, resolveSectionTitle } from '../types/cv';

// Helper function to format date in the active language.
// Accepts either 'YYYY' (year only) or 'YYYY-MM' (year + month).
const formatDate = (dateStr: string, language: 'en' | 'fr'): string => {
  if (!dateStr) return '';
  const trimmed = dateStr.trim();
  if (/^\d{4}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/^(\d{4})-(\d{2})$/);
  if (!match) return trimmed;
  const date = new Date(`${trimmed}-01`);
  if (isNaN(date.getTime())) return trimmed;
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';
  return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
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

const SkillsIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 9.19 8.63 2 9.27l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-6.99L22 9.27l-7.19-.64L12 2z"/>
  </svg>
);

const LanguageIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
  </svg>
);

const SoftSkillIcon = () => (
  <svg className="cv-section-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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

// Build the inline CSS-variable style for the active theme
function buildThemeStyle(settings: CVSettings): React.CSSProperties {
  const { theme } = settings;
  const headerSecondary = theme.useGradient ? theme.secondary : theme.primary;
  return {
    ['--cv-primary' as any]: theme.primary,
    ['--cv-secondary' as any]: headerSecondary,
    ['--cv-accent' as any]: theme.accent,
    ['--cv-accent-2' as any]: theme.useGradient ? theme.accentSecondary : theme.accent,
    ['--cv-sidebar-bg' as any]: theme.sidebarBg,
  };
}

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
    settings,
  } = cvData;

  const lang = settings.language;
  const t = TRANSLATIONS[lang];
  const title = (key: SectionTitleKey) => resolveSectionTitle(key, settings);
  const themeStyle = buildThemeStyle(settings);

  const technicalSkills = skills.filter((s) => s.category === 'technical' && s.name);
  const softSkills = skills.filter((s) => s.category === 'soft' && s.name);
  const languages = skills.filter((s) => s.category === 'language' && s.name);

  // After every render, push any element that straddles a visual page boundary
  // down to the next page so it is never visually cut in half.
  useEffect(() => {
    const cvPage = document.getElementById('cv-content');
    if (!cvPage) return;

    // Measure the pixel equivalent of 297mm (one A4 page height).
    const ruler = document.createElement('div');
    ruler.style.cssText = 'position:fixed;top:-9999px;left:-9999px;height:297mm;width:1px;';
    document.body.appendChild(ruler);
    const pageHeightPx = ruler.getBoundingClientRect().height;
    document.body.removeChild(ruler);
    if (!pageHeightPx) return;

    const selector = '.cv-timeline-item, .cv-project-card, .cv-cert-card';
    const elements = Array.from(cvPage.querySelectorAll<HTMLElement>(selector));

    // Reset any previously injected margins before recalculating.
    elements.forEach((el) => { el.style.marginTop = ''; });

    // Process in DOM order so each re-measurement sees the already-adjusted
    // positions of earlier siblings.
    elements.forEach((el) => {
      const cvRect = cvPage.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const elTop    = elRect.top    - cvRect.top;
      const elBottom = elRect.bottom - cvRect.top;

      const pageIndex = Math.floor(elTop / pageHeightPx);
      const boundary  = (pageIndex + 1) * pageHeightPx;

      if (elTop < boundary && elBottom > boundary && elRect.height < pageHeightPx * 0.9) {
        const currentMargin = parseFloat(getComputedStyle(el).marginTop) || 0;
        el.style.marginTop = `${currentMargin + (boundary - elTop)}px`;
      }
    });
  }, [cvData]);

  const profileImageBlock = (
    <div
      className={[
        'cv-profile-image-wrapper',
        `cv-image-shape-${settings.imageStyle.shape}`,
        settings.imageStyle.border ? 'cv-image-bordered' : '',
      ].filter(Boolean).join(' ')}
    >
      {personalInfo.profileImage ? (
        <img
          src={personalInfo.profileImage}
          alt={personalInfo.fullName}
          className="cv-profile-image"
          style={{
            transform: `scale(${settings.imageStyle.zoom})`,
            objectPosition: `${50 + settings.imageStyle.offsetX}% ${50 + settings.imageStyle.offsetY}%`,
          }}
        />
      ) : (
        <div className="cv-profile-placeholder">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}
    </div>
  );

  const contactItems = (
    <>
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
    </>
  );

  const skillsList = (
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
  );

  const languagesList = (
    <div className="cv-languages-list">
      {languages.map((lng) => (
        <div key={lng.id} className="cv-language-item">
          <span>{lng.name}</span>
          <span className="cv-language-level">
            {lng.level === 'expert' ? t.nativeFluent :
             lng.level === 'advanced' ? t.advanced :
             lng.level === 'intermediate' ? t.intermediate : t.basic}
          </span>
        </div>
      ))}
    </div>
  );

  const softSkillsList = (
    <div className="cv-soft-skills">
      {softSkills.map((skill) => (
        <span key={skill.id} className="cv-soft-skill-tag">{skill.name}</span>
      ))}
    </div>
  );

  const mainSections = (
    <>
      {/* Professional Summary */}
      {professionalSummary && (
            <section className="cv-main-section">
              <SectionTitle icon={<UserIcon />}>{title('aboutMe')}</SectionTitle>
              <p className="cv-summary-text">{professionalSummary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && workExperience.some(exp => exp.jobTitle || exp.company) && (
            <section className="cv-main-section">
              <SectionTitle icon={<BriefcaseIcon />}>{title('workExperience')}</SectionTitle>
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
                            {formatDate(exp.startDate, lang)} - {exp.current ? t.present : formatDate(exp.endDate, lang)}
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
              <SectionTitle icon={<GraduationIcon />}>{title('education')}</SectionTitle>
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
                            {edu.gpa && <p className="cv-timeline-meta">{t.gpa}: {edu.gpa}</p>}
                          </div>
                          <span className="cv-timeline-date">{formatDate(edu.graduationDate, lang)}</span>
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
              <SectionTitle icon={<CertIcon />}>{title('certifications')}</SectionTitle>
              <div className="cv-certs-grid">
                {certifications.map((cert) => (
                  cert.name && (
                    <div key={cert.id} className="cv-cert-card">
                      <span className="cv-cert-name">{cert.name}</span>
                      <span className="cv-cert-issuer">{cert.issuer}</span>
                      {cert.date && <span className="cv-cert-date">{formatDate(cert.date, lang)}</span>}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && projects.some(proj => proj.name) && (
            <section className="cv-main-section">
              <SectionTitle icon={<ProjectIcon />}>{title('projects')}</SectionTitle>
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
    </>
  );

  // Header layout: compact banner across the top, full-width single-column body.
  // Skills / Languages / Soft Skills live as normal sections in the main flow so
  // each one claims only the vertical space it actually needs.
  if (settings.layout === 'header') {
    return (
      <div className="cv-styled-page cv-layout-header" id="cv-content" style={themeStyle}>
        <div className="cv-content-wrapper">
          <header className="cv-top-banner">
            <div className="cv-top-banner-photo">{profileImageBlock}</div>
            <div className="cv-top-banner-identity">
              <h1 className="cv-name">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="cv-job-title">{personalInfo.jobTitle || 'Professional Title'}</p>
            </div>
            <div className="cv-top-banner-contact">{contactItems}</div>
          </header>

          <main className="cv-main cv-main-wide">
            {/* About Me */}
            {professionalSummary && (
              <section className="cv-main-section">
                <SectionTitle icon={<UserIcon />}>{title('aboutMe')}</SectionTitle>
                <p className="cv-summary-text">{professionalSummary}</p>
              </section>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && workExperience.some(exp => exp.jobTitle || exp.company) && (
              <section className="cv-main-section">
                <SectionTitle icon={<BriefcaseIcon />}>{title('workExperience')}</SectionTitle>
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
                              {formatDate(exp.startDate, lang)} - {exp.current ? t.present : formatDate(exp.endDate, lang)}
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
                <SectionTitle icon={<GraduationIcon />}>{title('education')}</SectionTitle>
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
                              {edu.gpa && <p className="cv-timeline-meta">{t.gpa}: {edu.gpa}</p>}
                            </div>
                            <span className="cv-timeline-date">{formatDate(edu.graduationDate, lang)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Skills — items rendered directly so the 2-col grid actually splits */}
            {technicalSkills.length > 0 && (
              <section className="cv-main-section">
                <SectionTitle icon={<SkillsIcon />}>{title('skills')}</SectionTitle>
                <div className="cv-skills-grid">
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
              </section>
            )}

            {/* Languages + Soft Skills share a row so short content doesn't waste width */}
            {(languages.length > 0 || softSkills.length > 0) && (
              <div className="cv-section-row">
                {languages.length > 0 && (
                  <section className="cv-main-section">
                    <SectionTitle icon={<LanguageIcon />}>{title('languages')}</SectionTitle>
                    <div className="cv-languages-inline">
                      {languages.map((lng, idx) => (
                        <span key={lng.id} className="cv-language-inline-item">
                          <strong>{lng.name}</strong>
                          <span className="cv-language-inline-level">
                            {lng.level === 'expert' ? t.nativeFluent :
                             lng.level === 'advanced' ? t.advanced :
                             lng.level === 'intermediate' ? t.intermediate : t.basic}
                          </span>
                          {idx < languages.length - 1 && <span className="cv-inline-sep">·</span>}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                {softSkills.length > 0 && (
                  <section className="cv-main-section">
                    <SectionTitle icon={<SoftSkillIcon />}>{title('softSkills')}</SectionTitle>
                    {softSkillsList}
                  </section>
                )}
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && certifications.some(cert => cert.name) && (
              <section className="cv-main-section">
                <SectionTitle icon={<CertIcon />}>{title('certifications')}</SectionTitle>
                <div className="cv-certs-grid">
                  {certifications.map((cert) => (
                    cert.name && (
                      <div key={cert.id} className="cv-cert-card">
                        <span className="cv-cert-name">{cert.name}</span>
                        <span className="cv-cert-issuer">{cert.issuer}</span>
                        {cert.date && <span className="cv-cert-date">{formatDate(cert.date, lang)}</span>}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && projects.some(proj => proj.name) && (
              <section className="cv-main-section">
                <SectionTitle icon={<ProjectIcon />}>{title('projects')}</SectionTitle>
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

  // Default sidebar layout
  return (
    <div className="cv-styled-page" id="cv-content" style={themeStyle}>
      {/* Decorative Header Background */}
      <div className="cv-header-bg"></div>

      <div className="cv-content-wrapper">
        <aside className="cv-sidebar">
          <div className="cv-profile-section">{profileImageBlock}</div>

          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">{title('contact')}</h3>
            <div className="cv-contact-list">{contactItems}</div>
          </div>

          {technicalSkills.length > 0 && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">{title('skills')}</h3>
              {skillsList}
            </div>
          )}

          {languages.length > 0 && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">{title('languages')}</h3>
              {languagesList}
            </div>
          )}

          {softSkills.length > 0 && (
            <div className="cv-sidebar-section">
              <h3 className="cv-sidebar-title">{title('softSkills')}</h3>
              {softSkillsList}
            </div>
          )}
        </aside>

        <main className="cv-main">
          <header className="cv-main-header">
            <h1 className="cv-name">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="cv-job-title">{personalInfo.jobTitle || 'Professional Title'}</p>
          </header>
          {mainSections}
        </main>
      </div>
    </div>
  );
}
