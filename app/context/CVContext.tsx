'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData, defaultCVData } from '../types/cv';

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
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const STORAGE_KEY = 'cv-maker-data';

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
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
