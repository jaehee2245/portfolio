import React, { useState } from 'react';
import { Linkedin, User, Volume2, VolumeX } from 'lucide-react';
import { aboutData } from '../data/projects';
import { playButtonClickSound, toggleSound, isSoundEnabled } from '../utils/sound';

export default function Sidebar({ onOpenAbout, onToast }) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleOpenAbout = () => {
    playButtonClickSound('open');
    onOpenAbout();
  };

  const handleLinkedInClick = (e) => {
    e.preventDefault();
    playButtonClickSound('default');
    if (aboutData.linkedinUrl && !aboutData.linkedinUrl.includes('example')) {
      window.open(aboutData.linkedinUrl, '_blank', 'noopener,noreferrer');
      onToast('Opening Lee Jaehee\'s LinkedIn profile...');
    } else {
      onToast('LinkedIn URL clicked! (Connect at linkedin.com/in/jaehee-lee2245)');
    }
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    onToast(newState ? 'Sound effects enabled 🔊' : 'Sound effects muted 🔇');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h1 className="author-name">{aboutData.name}</h1>
        <p className="author-tag">{aboutData.role}</p>
        <button 
          className="nav-link" 
          onClick={handleOpenAbout}
          aria-label="Open About Lee Jaehee"
          id="about-nav-btn"
        >
          About
        </button>
      </div>

      <div className="sidebar-bottom">
        <button 
          className="social-link sound-toggle-btn"
          onClick={handleToggleSound}
          aria-label={soundOn ? "Mute audio sound effects" : "Enable audio sound effects"}
          style={{ cursor: 'pointer', marginBottom: '8px' }}
        >
          {soundOn ? <Volume2 size={18} style={{ color: '#95a8c0' }} /> : <VolumeX size={18} style={{ color: '#636366' }} />}
          <span>{soundOn ? 'Sound On' : 'Sound Muted'}</span>
        </button>

        <a 
          href={aboutData.linkedinUrl} 
          onClick={handleLinkedInClick}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
          id="linkedin-link"
          aria-label="Lee Jaehee's LinkedIn Profile"
        >
          <span>LinkedIn</span>
        </a>
      </div>
    </aside>
  );
}

