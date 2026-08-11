import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { VisualCard, TextCard } from './components/ProjectCard';
import CaseStudyModal from './components/CaseStudyModal';
import AboutModal from './components/AboutModal';
import { projectsData } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const project1 = projectsData[0]; // Biscuit Camera
  const project2 = projectsData[1]; // Make Garden

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        onOpenAbout={() => setShowAbout(true)} 
        onToast={triggerToast}
      />

      {/* Main Portfolio Grid */}
      <main className="main-content">
        <div className="projects-grid">
          {/* Row 1: Project 1 (Biscuit Camera) */}
          <VisualCard 
            project={project1} 
            onSelect={(proj) => setSelectedProject(proj)} 
            onToast={triggerToast}
          />
          <TextCard 
            project={project1} 
            onSelect={(proj) => setSelectedProject(proj)} 
          />

          {/* Row 2: Project 2 (Make Garden) */}
          <TextCard 
            project={project2} 
            onSelect={(proj) => setSelectedProject(proj)} 
          />
          <VisualCard 
            project={project2} 
            onSelect={(proj) => setSelectedProject(proj)} 
            onToast={triggerToast}
          />
        </div>
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onToast={triggerToast}
        />
      )}

      {/* About Modal */}
      {showAbout && (
        <AboutModal 
          onClose={() => setShowAbout(false)} 
          onToast={triggerToast}
        />
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="toast-notice" role="status" aria-live="polite">
          <span>✨ {toastMessage}</span>
        </div>
      )}
    </div>
  );
}
