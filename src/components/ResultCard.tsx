import React from 'react';
import { CombinationResult } from '../types';
import './ResultCard.css';

interface ResultCardProps {
  result: CombinationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { genre, type, rating, ratingInfo } = result;

  return (
    <div className="result-card">
      <h3>Combination Result</h3>
      
      <div className="combination-display">
        <div className="combination-parts">
          <span className="genre-badge">{genre}</span>
          <span className="plus">+</span>
          <span className="type-badge">{type}</span>
        </div>
        
        <div 
          className="rating-display"
          style={{
            backgroundColor: ratingInfo.bgColor,
            color: ratingInfo.color,
            border: `2px solid ${ratingInfo.color}`
          }}
        >
          <div className="rating-score">
            {'★'.repeat(ratingInfo.score)}
            {'☆'.repeat(5 - ratingInfo.score)}
          </div>
          <div className="rating-label">
            {ratingInfo.label}
          </div>
        </div>
      </div>

      <div className="rating-description">
        {ratingInfo.score >= 4 && (
          <p className="success-message">
            🎉 Excellent combination! This will likely produce a successful game.
          </p>
        )}
        {ratingInfo.score === 3 && (
          <p className="good-message">
            👍 Decent combination. Should work well for your game.
          </p>
        )}
        {ratingInfo.score === 2 && (
          <p className="okay-message">
            🤔 Okay combination. Might work but not optimal.
          </p>
        )}
        {ratingInfo.score <= 1 && (
          <p className="poor-message">
            ⚠️ Poor combination. Consider trying different options.
          </p>
        )}
      </div>
    </div>
  );
};
