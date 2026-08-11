import React, { useEffect } from 'react';
import { X, Linkedin, BookOpen, GraduationCap, Code2, Sparkles, Send } from 'lucide-react';
import { aboutData } from '../data/projects';
import { playButtonClickSound } from '../utils/sound';

export default function AboutModal({ onClose, onToast }) {
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

  const handleLinkedInClick = (e) => {
    e.preventDefault();
    playButtonClickSound('default');
    window.open(aboutData.linkedinUrl, '_blank', 'noopener,noreferrer');
    onToast('Opening Lee Jaehee\'s LinkedIn profile...');
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      id="about-modal-overlay"
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="project-meta-tag">About</span>
            <h2 id="about-modal-title" className="project-title" style={{ margin: '4px 0 0' }}>
              {aboutData.name}
            </h2>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            aria-label="Close modal"
            id="about-close-icon-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          <p style={{ fontSize: '1.05rem', color: '#8da0b5', fontWeight: 500, marginBottom: '24px' }}>
            {aboutData.role}
          </p>

          {/* Education Box */}
          <div style={{
            background: 'rgba(141, 160, 181, 0.08)',
            border: '1px solid rgba(141, 160, 181, 0.2)',
            borderRadius: '18px',
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <GraduationCap size={28} style={{ color: '#95a8c0', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600 }}>{aboutData.university}</h4>
              <p style={{ color: '#b0b0b8', fontSize: '0.92rem', marginTop: '4px' }}>{aboutData.degree}</p>
              <p style={{ color: '#7a7a82', fontSize: '0.84rem', marginTop: '6px' }}>Focus: Computer Vision, Digital Signal Processing, Interactive Media Design & HCI</p>
            </div>
          </div>

          {/* Bio */}
          <div className="case-section">
            <h3 className="case-section-title">
              <Sparkles size={18} style={{ color: '#95a8c0' }} />
              Biography & Vision
            </h3>
            <p className="case-text">{aboutData.bio}</p>
          </div>

          {/* Skill Matrix */}
          <div className="case-section">
            <h3 className="case-section-title">
              <Code2 size={18} style={{ color: '#95a8c0' }} />
              Core Competencies
            </h3>
            <div className="badge-group" style={{ marginTop: '12px' }}>
              {aboutData.skills.map((skill, idx) => (
                <div key={idx} className="badge-pill" style={{ padding: '8px 14px', fontSize: '0.86rem', background: 'rgba(255,255,255,0.06)' }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Social & Contact Hyperlink Box */}
          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="case-section-title">Connect & Collaborate</h3>
            <p className="case-text" style={{ marginBottom: '16px' }}>
              Feel free to connect on LinkedIn or reach out for research, media engineering projects, and full-stack software inquiries.
            </p>
            
            <a 
              href={aboutData.linkedinUrl} 
              onClick={handleLinkedInClick}
              className="modal-action-btn"
              style={{ background: '#0a66c2', color: '#ffffff' }}
              id="about-modal-linkedin-link"
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

