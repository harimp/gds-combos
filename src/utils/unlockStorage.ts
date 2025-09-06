export interface UnlockState {
  unlockedGenres: Set<string>;
  unlockedTypes: Set<string>;
}

const STORAGE_KEY = 'gds-unlock-state';

export const saveUnlockState = (state: UnlockState): void => {
  try {
    const serializedState = {
      unlockedGenres: Array.from(state.unlockedGenres),
      unlockedTypes: Array.from(state.unlockedTypes)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedState));
  } catch (error) {
    console.error('Failed to save unlock state:', error);
  }
};

export const loadUnlockState = (): UnlockState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        unlockedGenres: new Set(parsed.unlockedGenres || []),
        unlockedTypes: new Set(parsed.unlockedTypes || [])
      };
    }
  } catch (error) {
    console.error('Failed to load unlock state:', error);
  }
  
  // Return default state with some basic unlocks
  return {
    unlockedGenres: new Set(['RPG', 'Simulation', 'Action']),
    unlockedTypes: new Set(['Fantasy', 'Sports', 'Adventure'])
  };
};

export const exportUnlockState = (state: UnlockState): string => {
  return JSON.stringify({
    unlockedGenres: Array.from(state.unlockedGenres),
    unlockedTypes: Array.from(state.unlockedTypes)
  }, null, 2);
};

export const importUnlockState = (jsonString: string): UnlockState | null => {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      unlockedGenres: new Set(parsed.unlockedGenres || []),
      unlockedTypes: new Set(parsed.unlockedTypes || [])
    };
  } catch (error) {
    console.error('Failed to import unlock state:', error);
    return null;
  }
};
