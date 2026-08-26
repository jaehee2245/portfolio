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
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <React.Fragment key={project.id || idx}>
                {isEven ? (
                  <>
                    <VisualCard 
                      project={project} 
                      onSelect={(proj) => setSelectedProject(proj)} 
                      onToast={triggerToast}
                    />
                    <TextCard 
                      project={project} 
                      onSelect={(proj) => setSelectedProject(proj)} 
                    />
                  </>
                ) : (
                  <>
                    <TextCard 
                      project={project} 
                      onSelect={(proj) => setSelectedProject(proj)} 
                    />
                    <VisualCard 
                      project={project} 
                      onSelect={(proj) => setSelectedProject(proj)} 
                      onToast={triggerToast}
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}
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
