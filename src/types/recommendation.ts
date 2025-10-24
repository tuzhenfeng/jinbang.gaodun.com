export interface School {
  id: string;
  name: string;
  location: string;
  type: string;
  rank: number;
  admissionProbability: number;
  rankDifference: number;
  batch: string;
  recommendedMajors: string[];
}

export interface FilterOptions {
  region?: string;
  schoolType?: string;
  majorCategory?: string;
  scoreDifference?: [number, number];
  batch?: string;
}

export type RecommendationTier = '冲' | '稳' | '保';

export interface RecommendationSectionProps {
  tier: RecommendationTier;
  schools: School[];
  onMajorClick: (schoolId: string) => void;
}
