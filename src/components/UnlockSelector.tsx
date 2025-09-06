import React, { useState } from 'react';
import { UnlockState, exportUnlockState, importUnlockState } from '../utils/unlockStorage';
import { getCombinationRating } from '../utils/combinationLogic';
import comboData from '../data/combo.json';
import './UnlockSelector.css';

interface UnlockSelectorProps {
  unlockState: UnlockState;
  onUnlockStateChange: (state: UnlockState) => void;
}

export const UnlockSelector: React.FC<UnlockSelectorProps> = ({
  unlockState,
  onUnlockStateChange,
}) => {
  const [activeTab, setActiveTab] = useState<'genres' | 'types'>('genres');
  const [importText, setImportText] = useState('');
  const [showImportExport, setShowImportExport] = useState(false);

  const handleGenreToggle = (genre: string) => {
    const newGenres = new Set(unlockState.unlockedGenres);
    if (newGenres.has(genre)) {
      newGenres.delete(genre);
    } else {
      newGenres.add(genre);
    }
    onUnlockStateChange({
      ...unlockState,
      unlockedGenres: newGenres
    });
  };

  const handleTypeToggle = (type: string) => {
    const newTypes = new Set(unlockState.unlockedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    onUnlockStateChange({
      ...unlockState,
      unlockedTypes: newTypes
    });
  };

  const handleUnlockAll = () => {
    onUnlockStateChange({
      unlockedGenres: new Set(comboData.genres),
      unlockedTypes: new Set(comboData.combos.map(combo => combo.type))
    });
  };

  const handleReset = () => {
    onUnlockStateChange({
      unlockedGenres: new Set(),
      unlockedTypes: new Set()
    });
  };

  const handleEarlyGameSetup = () => {
    onUnlockStateChange({
      unlockedGenres: new Set(['RPG', 'Simulation', 'Action', 'Adventure']),
      unlockedTypes: new Set(['Fantasy', 'Sports', 'Exploration', 'Romance', 'Comedy'])
    });
  };

  const handleExport = () => {
    const exported = exportUnlockState(unlockState);
    navigator.clipboard.writeText(exported).then(() => {
      alert('Unlock state copied to clipboard!');
    }).catch(() => {
      setImportText(exported);
      setShowImportExport(true);
    });
  };

  const handleImport = () => {
    const imported = importUnlockState(importText);
    if (imported) {
      onUnlockStateChange(imported);
      setImportText('');
      setShowImportExport(false);
      alert('Unlock state imported successfully!');
    } else {
      alert('Invalid import data. Please check the format.');
    }
  };

  // Calculate statistics
  const totalGenres = comboData.genres.length;
  const totalTypes = comboData.combos.length;
  const unlockedGenreCount = unlockState.unlockedGenres.size;
  const unlockedTypeCount = unlockState.unlockedTypes.size;

  // Count amazing/creative combinations available
  let amazingCount = 0;
  let creativeCount = 0;
  
  unlockState.unlockedGenres.forEach(genre => {
    unlockState.unlockedTypes.forEach(type => {
      const result = getCombinationRating(genre, type);
      if (result?.rating === 'Amazing!') amazingCount++;
      if (result?.rating === 'Creative') creativeCount++;
    });
  });

  return (
    <div className="unlock-selector">
      <div className="unlock-header">
        <h2>Unlock Manager</h2>
        <p>Select which genres and types you have unlocked in Game Dev Story</p>
        
        <div className="unlock-stats">
          <div className="stat-item">
            <span className="stat-label">Genres:</span>
            <span className="stat-value">{unlockedGenreCount}/{totalGenres}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Types:</span>
            <span className="stat-value">{unlockedTypeCount}/{totalTypes}</span>
          </div>
          <div className="stat-item amazing">
            <span className="stat-label">Amazing Combos:</span>
            <span className="stat-value">{amazingCount}</span>
          </div>
          <div className="stat-item creative">
            <span className="stat-label">Creative Combos:</span>
            <span className="stat-value">{creativeCount}</span>
          </div>
        </div>

        <div className="unlock-controls">
          <button onClick={handleEarlyGameSetup} className="control-btn early-game">
            Early Game Setup
          </button>
          <button onClick={handleUnlockAll} className="control-btn unlock-all">
            Unlock All
          </button>
          <button onClick={handleReset} className="control-btn reset">
            Reset All
          </button>
          <button 
            onClick={() => setShowImportExport(!showImportExport)} 
            className="control-btn import-export"
          >
            Import/Export
          </button>
        </div>

        {showImportExport && (
          <div className="import-export-panel">
            <div className="import-export-controls">
              <button onClick={handleExport} className="export-btn">
                Export to Clipboard
              </button>
              <div className="import-section">
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste exported unlock state here..."
                  rows={4}
                />
                <button onClick={handleImport} className="import-btn">
                  Import
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="unlock-tabs">
        <button 
          className={`tab-btn ${activeTab === 'genres' ? 'active' : ''}`}
          onClick={() => setActiveTab('genres')}
        >
          Genres ({unlockedGenreCount}/{totalGenres})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'types' ? 'active' : ''}`}
          onClick={() => setActiveTab('types')}
        >
          Types ({unlockedTypeCount}/{totalTypes})
        </button>
      </div>

      <div className="unlock-content">
        {activeTab === 'genres' ? (
          <div className="unlock-grid">
            {comboData.genres.map(genre => (
              <label key={genre} className="unlock-item">
                <input
                  type="checkbox"
                  checked={unlockState.unlockedGenres.has(genre)}
                  onChange={() => handleGenreToggle(genre)}
                />
                <span className="unlock-label">{genre}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="unlock-grid">
            {comboData.combos.map(combo => (
              <label key={combo.type} className="unlock-item">
                <input
                  type="checkbox"
                  checked={unlockState.unlockedTypes.has(combo.type)}
                  onChange={() => handleTypeToggle(combo.type)}
                />
                <span className="unlock-label">{combo.type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
