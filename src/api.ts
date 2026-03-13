import { Meal } from "./meals.js";
import { ApiError } from "./error.js";

export async function fetchMeals(): Promise<Meal[]> {
  try {
    const response = await fetch("https://keligmartin.github.io/api/meals.json");

    if (!response.ok) {
      throw new ApiError(response.status); 
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    
    throw new ApiError(0);
  }
}