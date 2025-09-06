import React, { useState, useEffect } from 'react';
import { CombinationSelector } from './components/CombinationSelector';
import { ResultCard } from './components/ResultCard';
import { CombinationMatrix } from './components/CombinationMatrix';
import { UnlockSelector } from './components/UnlockSelector';
import { getCombinationRating } from './utils/combinationLogic';
import { UnlockState, loadUnlockState, saveUnlockState } from './utils/unlockStorage';
import comboData from './data/combo.json';
import './App.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [view, setView] = useState<'selector' | 'matrix' | 'unlock'>('selector');
  const [unlockState, setUnlockState] = useState<UnlockState>(() => loadUnlockState());

  // Save unlock state to localStorage whenever it changes
  useEffect(() => {
    saveUnlockState(unlockState);
  }, [unlockState]);

  const combinationResult = selectedGenre && selectedType 
    ? getCombinationRating(selectedGenre, selectedType)
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Game Dev Story - Combination Table</h1>
        <p>Find the best genre and type combinations for your games!</p>
        
        <div className="view-toggle">
          <button 
            className={view === 'selector' ? 'active' : ''}
            onClick={() => setView('selector')}
          >
            Combination Selector
          </button>
          <button 
            className={view === 'matrix' ? 'active' : ''}
            onClick={() => setView('matrix')}
          >
            Full Matrix
          </button>
          <button 
            className={view === 'unlock' ? 'active' : ''}
            onClick={() => setView('unlock')}
          >
            Unlock Manager
          </button>
        </div>
      </header>

      <main className="app-main">
        {view === 'selector' ? (
          <div className="selector-view">
            <CombinationSelector
              genres={comboData.genres}
              types={comboData.combos.map(combo => combo.type)}
              selectedGenre={selectedGenre}
              selectedType={selectedType}
              onGenreChange={setSelectedGenre}
              onTypeChange={setSelectedType}
              unlockState={unlockState}
            />
            
            {combinationResult && (
              <ResultCard result={combinationResult} />
            )}
          </div>
        ) : view === 'matrix' ? (
          <CombinationMatrix unlockState={unlockState} />
        ) : (
          <UnlockSelector
            unlockState={unlockState}
            onUnlockStateChange={setUnlockState}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Data from Game Dev Story by Kairosoft</p>
      </footer>
    </div>
  );
}

export default App;
