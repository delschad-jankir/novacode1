'use client';

import { createContext, useState, ReactNode } from 'react';

interface ProjectContextType {
  selectedProject: any;
  setSelectedProject: (project: any) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  selectedProject: null,
  setSelectedProject: () => {},
});

interface ProjectContextProviderProps {
  children: ReactNode;
}

export const ProjectContextProvider = ({ children }: ProjectContextProviderProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};