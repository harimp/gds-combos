export interface CombinationData {
  genres: string[];
  combos: {
    type: string;
    combo: string[];
  }[];
}

export interface RatingInfo {
  score: number;
  color: string;
  label: string;
  bgColor: string;
}

export type RatingType = "Amazing!" | "Creative" | "Not Bad" | "Hmm..." | "Not Good" | "Nothing" | "";

export const RATINGS: Record<RatingType, RatingInfo> = {
  "Amazing!": { 
    score: 5, 
    color: "#2E7D32", 
    label: "Amazing!", 
    bgColor: "#E8F5E8" 
  },
  "Creative": { 
    score: 4, 
    color: "#1565C0", 
    label: "Creative", 
    bgColor: "#E3F2FD" 
  },
  "Not Bad": { 
    score: 3, 
    color: "#EF6C00", 
    label: "Not Bad", 
    bgColor: "#FFF3E0" 
  },
  "Hmm...": { 
    score: 2, 
    color: "#F57C00", 
    label: "Hmm...", 
    bgColor: "#FFF8E1" 
  },
  "Not Good": { 
    score: 1, 
    color: "#C62828", 
    label: "Not Good", 
    bgColor: "#FFEBEE" 
  },
  "Nothing": { 
    score: 0, 
    color: "#616161", 
    label: "Nothing", 
    bgColor: "#F5F5F5" 
  },
  "": { 
    score: 0, 
    color: "#9E9E9E", 
    label: "Unknown", 
    bgColor: "#FAFAFA" 
  }
};

export interface CombinationResult {
  genre: string;
  type: string;
  rating: RatingType;
  ratingInfo: RatingInfo;
}
