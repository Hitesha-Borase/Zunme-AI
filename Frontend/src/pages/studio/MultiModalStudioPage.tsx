import React, { useState } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  FileEdit,
  ArrowRight
} from 'lucide-react';
import { ImageStudio } from '../../components/studio/ImageStudio';
import { VideoScriptStudio } from '../../components/studio/VideoScriptStudio';
import '../../styles/dashboard.css';
import '../../components/studio/StudioStyles.css';

export const MultiModalStudioPage: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<'image' | 'video'>('image');

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#6E56CF" />
            Multi-Modal Studio
          </h1>
          <p className="dashboard-subtitle">
            Generate high-fidelity visual concepts with the AI Image Diffusion Engine and structured scene-by-scene video scripts with the Video Script Generator.
          </p>
        </div>
      </div>

      {/* Engine Switcher Tab Bar */}
      <div className="studio-tab-bar">
        <button
          className={`studio-nav-pill ${activeEngine === 'image' ? 'active' : ''}`}
          onClick={() => setActiveEngine('image')}
        >
          <ImageIcon size={15} />
          <span>AI Image Studio</span>
        </button>

        <button
          className={`studio-nav-pill ${activeEngine === 'video' ? 'active' : ''}`}
          onClick={() => setActiveEngine('video')}
        >
          <Video size={15} />
          <span>AI Video Script Engine</span>
        </button>
      </div>

      {/* Engine View */}
      {activeEngine === 'image' ? <ImageStudio /> : <VideoScriptStudio />}
    </div>
  );
};
