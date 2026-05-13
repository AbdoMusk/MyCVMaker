'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData, CVSettings, defaultCVData, defaultSettings } from '../types/cv';

interface CVContextType {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  updateProfessionalSummary: (summary: string) => void;
  updateWorkExperience: (experiences: CVData['workExperience']) => void;
  updateEducation: (education: CVData['education']) => void;
  updateSkills: (skills: CVData['skills']) => void;
  updateCertifications: (certifications: CVData['certifications']) => void;
  updateProjects: (projects: CVData['projects']) => void;
  updateSettings: (settings: Partial<CVSettings>) => void;
  updateTheme: (theme: Partial<CVSettings['theme']>) => void;
  updateCustomTitle: (key: keyof CVSettings['customTitles'], value: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const STORAGE_KEY = 'cv-maker-data';

// Merge stored data with defaults so older payloads without `settings` keep working
function migrate(raw: any): CVData {
  if (!raw || typeof raw !== 'object') return defaultCVData;
  return {
    ...defaultCVData,
    ...raw,
    settings: {
      ...defaultSettings,
      ...(raw.settings || {}),
      theme: {
        ...defaultSettings.theme,
        ...((raw.settings && raw.settings.theme) || {}),
      },
      customTitles: {
        ...defaultSettings.customTitles,
        ...((raw.settings && raw.settings.customTitles) || {}),
      },
    },
  };
}

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setCVData(migrate(JSON.parse(savedData)));
      } catch (error) {
        console.error('Failed to parse CV data from local storage', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData, isLoaded]);

  const updateCVData = (data: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<CVData['personalInfo']>) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateProfessionalSummary = (summary: string) => {
    setCVData(prev => ({ ...prev, professionalSummary: summary }));
  };

  const updateWorkExperience = (experiences: CVData['workExperience']) => {
    setCVData(prev => ({ ...prev, workExperience: experiences }));
  };

  const updateEducation = (education: CVData['education']) => {
    setCVData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: CVData['skills']) => {
    setCVData(prev => ({ ...prev, skills }));
  };

  const updateCertifications = (certifications: CVData['certifications']) => {
    setCVData(prev => ({ ...prev, certifications }));
  };

  const updateProjects = (projects: CVData['projects']) => {
    setCVData(prev => ({ ...prev, projects }));
  };

  const updateSettings = (settings: Partial<CVSettings>) => {
    setCVData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const updateTheme = (theme: Partial<CVSettings['theme']>) => {
    setCVData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: { ...prev.settings.theme, ...theme },
      },
    }));
  };

  const updateCustomTitle = (key: keyof CVSettings['customTitles'], value: string) => {
    setCVData(prev => {
      const nextTitles = { ...prev.settings.customTitles };
      if (value && value.trim()) {
        nextTitles[key] = value;
      } else {
        delete nextTitles[key];
      }
      return {
        ...prev,
        settings: { ...prev.settings, customTitles: nextTitles },
      };
    });
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updateCVData,
        updatePersonalInfo,
        updateProfessionalSummary,
        updateWorkExperience,
        updateEducation,
        updateSkills,
        updateCertifications,
        updateProjects,
        updateSettings,
        updateTheme,
        updateCustomTitle,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
