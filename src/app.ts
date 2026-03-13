import { Meal } from './meals.js';
import { fetchMeals } from './api.js';

async function init() {
  const mealList = document.getElementById('mealList');
  if (!mealList) return;

  const meals = await fetchMeals();

  meals.forEach((meal: Meal) => {
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.textContent = `${meal.name} - ${meal.price}€ `;

    const button = document.createElement('button');
    button.textContent = "Commander";

    li.appendChild(button);
    mealList.appendChild(li);
  });
}

init();