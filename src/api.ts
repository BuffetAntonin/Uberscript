import { Meal } from './meals.js';
import { ApiError } from './error.js';

export async function fetchMeals(): Promise<Meal[]> {
  try {
    const response = await fetch('https://keligmartin.github.io/api/meals.json');
    
    if (!response.ok) {
      throw new ApiError("Erreur lors du chargement des repas");
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(error.message);
    } else {
      console.error("Erreur lors du chargement des repas");
    }
    return []; 
  }
}