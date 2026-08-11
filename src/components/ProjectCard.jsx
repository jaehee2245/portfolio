import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Video } from 'lucide-react';
import { playButtonClickSound } from '../utils/sound';

export function VisualCard({ project, onSelect, onToast }) {
  const videoRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const videoSrc = project.video || (typeof project.image === 'string' && project.image.match(/\.(mp4|webm|mov|ogg)$/i) ? project.image : null);
  const isContain = project.objectFit === 'contain';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or waiting for user interaction:', err);
      });
    }
  }, [videoSrc]);

  const handleClick = () => {
    playButtonClickSound('open');
    onSelect(project);
  };

  const handleToggleVideoAudio = (e) => {
    e.stopPropagation(); // prevent opening case study modal
    playButtonClickSound('toggle');
    if (videoRef.current) {
      const nextState = !videoRef.current.muted;
      videoRef.current.muted = nextState;
      setIsAudioMuted(nextState);
      if (!nextState) {
        videoRef.current.play().catch(() => {});
      }
      if (onToast) {
        onToast(nextState ? `Muted video sound for ${project.title}` : `Playing video sound for ${project.title} 🔊`);
      }
    }
  };

  return (
    <div 
      className={`portfolio-card card-visual ${project.visualStyle}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      id={`card-visual-${project.id}`}
      aria-label={`View ${project.title} Visual Preview`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="card-image-wrapper">
        {videoSrc ? (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted={isAudioMuted}
              playsInline 
              key={videoSrc}
              className={`card-image ${isContain ? 'contain-fit' : ''}`}
            >
              <source src={videoSrc} />
              <source src="./assets/0806.mp4" type="video/mp4" />
            </video>
            <button 
              className="video-sound-btn"
              onClick={handleToggleVideoAudio}
              aria-label={isAudioMuted ? "Unmute video sound" : "Mute video sound"}
              title={isAudioMuted ? "Press for video sound" : "Mute video sound"}
            >
              {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} style={{ color: '#95a8c0' }} />}
              <span>{isAudioMuted ? "Video Sound" : "Sound Playing"}</span>
            </button>
          </>
        ) : (
          <>
            <img 
              src={project.image} 
              alt={`${project.title} Preview Showcase`}
              className={`card-image ${isContain ? 'contain-fit' : ''}`}
              loading="lazy"
            />
            {project.videoUrl && (
              <a 
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-sound-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  playButtonClickSound('toggle');
                  if (onToast) onToast(`Opening demo video for ${project.title}`);
                }}
                style={{ textDecoration: 'none' }}
                title="Watch Demo Video on Google Drive"
              >
                <Video size={15} />
                <span>Watch Video</span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function TextCard({ project, onSelect }) {
  const handleClick = () => {
    playButtonClickSound('open');
    onSelect(project);
  };

  return (
    <div 
      className="portfolio-card card-text-content"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      id={`card-text-${project.id}`}
      aria-label={`Read ${project.title} Case Study`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div>
        <div className="card-header-row">
          <div style={{ flex: 1 }}></div>
          <button 
            className="action-arrow-btn" 
            aria-label={`Open Case Study for ${project.title}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <ArrowUpRight size={22} />
          </button>
        </div>

        <h2 className="project-title">{project.title}</h2>
        <p className="project-desc">{project.description}</p>
        
        <div className="badge-group">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="badge-pill">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-footer-row">
        <span className="project-meta-tag">{project.tag}</span>
      </div>
    </div>
  );
}

