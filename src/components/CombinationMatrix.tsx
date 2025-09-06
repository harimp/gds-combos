import React, { useState, useMemo } from 'react';
import { getAllCombinations } from '../utils/combinationLogic';
import { RATINGS } from '../types';
import { UnlockState } from '../utils/unlockStorage';
import './CombinationMatrix.css';

interface CombinationMatrixProps {
  unlockState: UnlockState;
}

export const CombinationMatrix: React.FC<CombinationMatrixProps> = ({ unlockState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);
  const [highlightSpecial, setHighlightSpecial] = useState(true);
  
  const allCombinations = useMemo(() => getAllCombinations(), []);
  
  const filteredCombinations = useMemo(() => {
    return allCombinations.filter(combo => {
      const matchesSearch = searchTerm === '' || 
        combo.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        combo.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterRating === '' || combo.rating === filterRating;
      
      const matchesUnlocked = !showOnlyUnlocked || 
        (unlockState.unlockedGenres.has(combo.genre) && unlockState.unlockedTypes.has(combo.type));
      
      return matchesSearch && matchesRating && matchesUnlocked;
    });
  }, [allCombinations, searchTerm, filterRating, showOnlyUnlocked, unlockState]);

  const ratingOptions = Object.keys(RATINGS).filter(rating => rating !== '');

  return (
    <div className="combination-matrix">
      <div className="matrix-header">
        <h2>Complete Combination Matrix</h2>
        
        <div className="matrix-controls">
          <div className="search-group">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              placeholder="Search genres or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="rating-filter">Filter by Rating:</label>
            <select
              id="rating-filter"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="filter-select"
            >
              <option value="">All Ratings</option>
              {ratingOptions.map(rating => (
                <option key={rating} value={rating}>
                  {RATINGS[rating as keyof typeof RATINGS].label}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showOnlyUnlocked}
                onChange={(e) => setShowOnlyUnlocked(e.target.checked)}
              />
              Show only unlocked combinations
            </label>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={highlightSpecial}
                onChange={(e) => setHighlightSpecial(e.target.checked)}
              />
              Highlight Amazing/Creative combinations
            </label>
          </div>
        </div>
      </div>

      <div className="matrix-stats">
        <p>Showing {filteredCombinations.length} of {allCombinations.length} combinations</p>
      </div>

      <div className="matrix-table-container">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Genre</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredCombinations.map((combo, index) => {
              const isUnlocked = unlockState.unlockedGenres.has(combo.genre) && unlockState.unlockedTypes.has(combo.type);
              const isSpecial = combo.rating === 'Amazing!' || combo.rating === 'Creative';
              const shouldHighlight = highlightSpecial && isSpecial && isUnlocked;
              
              return (
                <tr 
                  key={`${combo.genre}-${combo.type}-${index}`}
                  className={`
                    ${!isUnlocked ? 'locked-combination' : ''}
                    ${shouldHighlight ? 'highlighted-combination' : ''}
                    ${combo.rating === 'Amazing!' && shouldHighlight ? 'amazing-highlight' : ''}
                    ${combo.rating === 'Creative' && shouldHighlight ? 'creative-highlight' : ''}
                  `.trim()}
                >
                  <td className="genre-cell">
                    {combo.genre}
                    {!unlockState.unlockedGenres.has(combo.genre) && <span className="lock-icon">🔒</span>}
                  </td>
                  <td className="type-cell">
                    {combo.type}
                    {!unlockState.unlockedTypes.has(combo.type) && <span className="lock-icon">🔒</span>}
                  </td>
                  <td 
                    className="rating-cell"
                    style={{
                      backgroundColor: combo.ratingInfo.bgColor,
                      color: combo.ratingInfo.color
                    }}
                  >
                    {combo.ratingInfo.label}
                    {shouldHighlight && combo.rating === 'Amazing!' && <span className="special-icon">⭐</span>}
                    {shouldHighlight && combo.rating === 'Creative' && <span className="special-icon">✨</span>}
                  </td>
                  <td className="score-cell">
                    {'★'.repeat(combo.ratingInfo.score)}
                    {'☆'.repeat(5 - combo.ratingInfo.score)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredCombinations.length === 0 && (
        <div className="no-results">
          <p>No combinations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
