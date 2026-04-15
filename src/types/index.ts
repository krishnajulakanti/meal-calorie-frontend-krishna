export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface MacroNutrients {
  protein: number;
  total_fat: number;
  carbohydrates: number;
  fiber?: number;
  sugars?: number;
  saturated_fat?: number;
}

export interface CalorieResult {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  macronutrients_per_serving: MacroNutrients;
  total_macronutrients: MacroNutrients;
  source: string;
  matched_food: {
    name: string;
    fdc_id: number;
    data_type: string;
    published_date: string;
  };
}

export interface MealHistoryItem extends CalorieResult {
  searched_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
export interface ApiError {
  error: string;
  message: string;
  status_code: number;
  retryAfter?: number;
}
