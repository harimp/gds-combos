import { CombinationData, RatingType, RATINGS, CombinationResult } from '../types';
import comboData from '../data/combo.json';

export const getCombinationRating = (genre: string, type: string): CombinationResult => {
  const data = comboData as CombinationData;
  const genreIndex = data.genres.indexOf(genre);
  const typeCombo = data.combos.find(combo => combo.type === type);
  
  if (genreIndex === -1 || !typeCombo) {
    return {
      genre,
      type,
      rating: "",
      ratingInfo: RATINGS[""]
    };
  }
  
  const rating = typeCombo.combo[genreIndex] as RatingType;
  return {
    genre,
    type,
    rating,
    ratingInfo: RATINGS[rating]
  };
};

export const getAllCombinations = (): CombinationResult[] => {
  const data = comboData as CombinationData;
  const results: CombinationResult[] = [];
  
  data.combos.forEach(typeCombo => {
    data.genres.forEach((genre, genreIndex) => {
      const rating = typeCombo.combo[genreIndex] as RatingType;
      results.push({
        genre,
        type: typeCombo.type,
        rating,
        ratingInfo: RATINGS[rating]
      });
    });
  });
  
  return results;
};

export const getBestCombinations = (minScore: number = 4): CombinationResult[] => {
  return getAllCombinations().filter(combo => combo.ratingInfo.score >= minScore);
};

export const getGenreAnalysis = (genre: string): CombinationResult[] => {
  const data = comboData as CombinationData;
  const genreIndex = data.genres.indexOf(genre);
  
  if (genreIndex === -1) return [];
  
  return data.combos.map(typeCombo => {
    const rating = typeCombo.combo[genreIndex] as RatingType;
    return {
      genre,
      type: typeCombo.type,
      rating,
      ratingInfo: RATINGS[rating]
    };
  }).sort((a, b) => b.ratingInfo.score - a.ratingInfo.score);
};

export const getTypeAnalysis = (type: string): CombinationResult[] => {
  const data = comboData as CombinationData;
  const typeCombo = data.combos.find(combo => combo.type === type);
  
  if (!typeCombo) return [];
  
  return data.genres.map((genre, genreIndex) => {
    const rating = typeCombo.combo[genreIndex] as RatingType;
    return {
      genre,
      type,
      rating,
      ratingInfo: RATINGS[rating]
    };
  }).sort((a, b) => b.ratingInfo.score - a.ratingInfo.score);
};
