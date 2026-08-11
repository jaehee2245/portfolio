import React, { useEffect, useRef, useState } from 'react';
import { X, Cpu, Layers, Sparkles, CheckCircle2, Volume2, VolumeX, Layout, FileText, Video, ExternalLink } from 'lucide-react';
import { playButtonClickSound } from '../utils/sound';

function renderFormattedText(text) {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((para, pIdx) => {
    const parts = para.split(/(<u>.*?<\/u>)/gi);
    return (
      <p key={pIdx} className="case-text" style={{ marginBottom: '14px', whiteSpace: 'pre-line' }}>
        {parts.map((part, i) => {
          if (/^<u>.*<\/u>$/i.test(part)) {
            const inner = part.replace(/^<u>/i, '').replace(/<\/u>$/i, '');
            return (
              <u 
                key={i} 
                style={{ 
                  textDecoration: 'underline', 
                  textDecorationColor: '#95a8c0', 
                  textUnderlineOffset: '4px', 
                  textDecorationThickness: '2px', 
                  color: '#ffffff', 
                  fontWeight: 500 
                }}
              >
                {inner}
              </u>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export default function CaseStudyModal({ project, onClose, onToast }) {
  const heroVideoRef = useRef(null);
  const [isHeroAudioMuted, setIsHeroAudioMuted] = useState(true);

  const handleClose = () => {
    playButtonClickSound('close');
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [project]);

  if (!project) return null;

  const { caseStudy } = project;
  const isContain = project.objectFit === 'contain';

  const handleToggleHeroAudio = () => {
    playButtonClickSound('toggle');
    if (heroVideoRef.current) {
      const nextState = !heroVideoRef.current.muted;
      heroVideoRef.current.muted = nextState;
      setIsHeroAudioMuted(nextState);
      if (!nextState) {
        heroVideoRef.current.play().catch(() => {});
      }
      if (onToast) {
        onToast(nextState ? `Muted video sound for ${project.title}` : `Playing video sound for ${project.title} 🔊`);
      }
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      id="case-study-overlay"
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Sticky Header */}
        <div className="modal-header">
          <div>
            <span className="project-meta-tag">{project.tag}</span>
            <h2 id="modal-project-title" className="project-title" style={{ margin: '4px 0 0' }}>
              {project.title}
            </h2>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            aria-label="Close modal"
            id="modal-close-icon-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          <p style={{ fontSize: '1.1rem', color: '#e0e0e0', fontWeight: 500, lineHeight: 1.5 }}>
            {caseStudy.tagline}
          </p>

          {(() => {
            const heroMedia = caseStudy.heroVideo || caseStudy.heroImage || project.video || project.image;
            const isVideo = caseStudy.heroVideo || (typeof heroMedia === 'string' && heroMedia.match(/\.(mp4|webm|mov|ogg)$/i));

            if (isVideo) {
              return (
                <div className="video-hero-wrapper">
                  <video 
                    ref={heroVideoRef}
                    autoPlay 
                    loop 
                    muted={isHeroAudioMuted} 
                    playsInline 
                    key={project.id}
                    className={`case-hero-img ${isContain ? 'contain-fit' : ''}`}
                  >
                    <source src={caseStudy.heroVideo || (isVideo ? heroMedia : project.video)} />
                    <source src="./assets/0806.mp4" type="video/mp4" />
                  </video>
                  <button 
                    className="video-sound-btn"
                    onClick={handleToggleHeroAudio}
                    aria-label={isHeroAudioMuted ? "Unmute video sound" : "Mute video sound"}
                    title={isHeroAudioMuted ? "Press for video sound" : "Mute video sound"}
                  >
                    {isHeroAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} style={{ color: '#95a8c0' }} />}
                    <span>{isHeroAudioMuted ? "Press for Video Sound" : "Video Sound Active"}</span>
                  </button>
                </div>
              );
            }
            return (
              <img 
                src={heroMedia} 
                alt={`${project.title} Case Study Visual`} 
                className={`case-hero-img ${isContain ? 'contain-fit' : ''}`}
              />
            );
          })()}

          {/* Overview */}
          <div className="case-section">
            <h3 className="case-section-title">
              <Sparkles size={18} style={{ color: '#95a8c0' }} />
              Overview & Context
            </h3>
            {renderFormattedText(caseStudy.overview)}
          </div>

          {/* Problem & Motivation */}
          <div className="case-section">
            <h3 className="case-section-title">
              <Layers size={18} style={{ color: '#95a8c0' }} />
              Problem & Engineering Challenge
            </h3>
            {renderFormattedText(caseStudy.problem)}
            {caseStudy.problemImage && (
              <div style={{ marginTop: '20px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#09090b', padding: '12px' }}>
                <img 
                  src={caseStudy.problemImage} 
                  alt={`${project.title} Problem & Solution Visual`} 
                  onError={(e) => {
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = '1';
                      if (e.target.src.endsWith('.png')) e.target.src = e.target.src.replace('.png', '.PNG');
                      else if (e.target.src.endsWith('.PNG')) e.target.src = e.target.src.replace('.PNG', '.jpg');
                      else if (e.target.src.endsWith('.jpg')) e.target.src = e.target.src.replace('.jpg', '.jpeg');
                    }
                  }}
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block', borderRadius: '12px' }} 
                />
              </div>
            )}
          </div>

          {/* Architecture */}
          <div className="case-section">
            <h3 className="case-section-title">
              <Cpu size={18} style={{ color: '#95a8c0' }} />
              Information Engineering & System Architecture
            </h3>
            <div className="tech-grid">
              {caseStudy.architecture.map((item, idx) => (
                <div key={idx} className="tech-card">
                  <div className="tech-card-name">{item.title}</div>
                  <div className="tech-card-role">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="case-section">
            <h3 className="case-section-title">Tech Stack & Media Pipeline</h3>
            <div className="badge-group" style={{ marginTop: '8px' }}>
              {caseStudy.techStack.map((tech, idx) => (
                <div key={idx} className="badge-pill" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                  <strong>{tech.name}</strong> — <span style={{ opacity: 0.8 }}>{tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="case-section">
            <h3 className="case-section-title">Key Engineering Highlights</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {caseStudy.highlights.map((highlight, idx) => (
                <li key={idx} className="case-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={16} style={{ color: '#95a8c0', flexShrink: 0 }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links (Video & Poster) */}
          {(project.videoUrl || caseStudy.videoUrl || project.posterUrl || caseStudy.posterUrl) && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {(project.videoUrl || caseStudy.videoUrl) && (
                <a 
                  href={project.videoUrl || caseStudy.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-action-btn"
                  onClick={() => {
                    playButtonClickSound('default');
                    if (onToast) onToast(`Opening demo video for ${project.title}`);
                  }}
                >
                  <Video size={16} />
                  Watch Demo Video
                  <ExternalLink size={13} style={{ opacity: 0.7, marginLeft: '4px' }} />
                </a>
              )}
              {(project.posterUrl || caseStudy.posterUrl) && (
                <a 
                  href={project.posterUrl || caseStudy.posterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-action-btn"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff' }}
                  onClick={() => {
                    playButtonClickSound('default');
                    if (onToast) onToast(`Opening poster for ${project.title}`);
                  }}
                >
                  <FileText size={16} />
                  View Poster
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

