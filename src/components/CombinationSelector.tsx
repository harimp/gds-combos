import React from 'react';
import { UnlockState } from '../utils/unlockStorage';
import { getCombinationRating } from '../utils/combinationLogic';
import './CombinationSelector.css';

interface CombinationSelectorProps {
  genres: string[];
  types: string[];
  selectedGenre: string;
  selectedType: string;
  onGenreChange: (genre: string) => void;
  onTypeChange: (type: string) => void;
  unlockState: UnlockState;
}

export const CombinationSelector: React.FC<CombinationSelectorProps> = ({
  genres,
  types,
  selectedGenre,
  selectedType,
  onGenreChange,
  onTypeChange,
  unlockState,
}) => {
  // Filter to only show unlocked items
  const unlockedGenres = genres.filter(genre => unlockState.unlockedGenres.has(genre));
  const unlockedTypes = types.filter(type => unlockState.unlockedTypes.has(type));

  // Helper function to get visual indicator for amazing/creative combinations
  const getOptionLabel = (genre: string, type: string) => {
    const result = getCombinationRating(genre, type);
    if (result?.rating === 'Amazing!') return `${type} ⭐`;
    if (result?.rating === 'Creative') return `${type} ✨`;
    return type;
  };

  const getGenreOptionLabel = (genre: string) => {
    // Check if this genre has any amazing/creative combinations with unlocked types
    const hasAmazing = unlockedTypes.some(type => {
      const result = getCombinationRating(genre, type);
      return result?.rating === 'Amazing!';
    });
    const hasCreative = unlockedTypes.some(type => {
      const result = getCombinationRating(genre, type);
      return result?.rating === 'Creative';
    });
    
    if (hasAmazing) return `${genre} ⭐`;
    if (hasCreative) return `${genre} ✨`;
    return genre;
  };
  return (
    <div className="combination-selector">
      <h2>Select Genre and Type</h2>
      
      <div className="selector-grid">
        <div className="selector-group">
          <label htmlFor="genre-select">Genre ({unlockedGenres.length} unlocked):</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="selector-dropdown"
          >
            <option value="">-- Select Genre --</option>
            {unlockedGenres.map((genre) => (
              <option key={genre} value={genre}>
                {getGenreOptionLabel(genre)}
              </option>
            ))}
          </select>
          {unlockedGenres.length === 0 && (
            <p className="no-unlocks">No genres unlocked. Visit the Unlock Manager to select genres.</p>
          )}
        </div>

        <div className="selector-group">
          <label htmlFor="type-select">Type ({unlockedTypes.length} unlocked):</label>
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="selector-dropdown"
          >
            <option value="">-- Select Type --</option>
            {selectedGenre && unlockedTypes.map((type) => (
              <option key={type} value={type}>
                {getOptionLabel(selectedGenre, type)}
              </option>
            ))}
          </select>
          {unlockedTypes.length === 0 && (
            <p className="no-unlocks">No types unlocked. Visit the Unlock Manager to select types.</p>
          )}
        </div>
      </div>

      {selectedGenre && selectedType && (
        <div className="selection-summary">
          <p>
            <strong>Selected:</strong> {selectedGenre} + {selectedType}
          </p>
        </div>
      )}
    </div>
  );
};
