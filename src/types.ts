export interface WorkoutLog {
  id: string;
  date: string; // ISO string or YYYY-MM-DD
  steps: number;
  distance: number; // in km
  calories: number;
}

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
}

export interface FoodWaterLog {
  id: string;
  date: string;
  waterInput: number; // in glasses
  fruitsVeggiesCount: number; // portions
}

export interface UserProfile {
  username: string;
  fullName: string;
  targetSteps: number;
  targetWater: number; // in glasses
  targetWeight: number; // in kg
  currentWeight: number; // in kg
}

export interface HealthState {
  profile: UserProfile;
  workouts: WorkoutLog[];
  weights: WeightLog[];
  foodWater: FoodWaterLog[];
}
