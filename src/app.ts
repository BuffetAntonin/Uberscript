import { fetchMeals, Meal } from './api.js';
import { User } from './user.js';

const moi = new User(1, "Antonin", 50);

const listeRepas = document.getElementById('mealList');
const listeMenu = document.getElementById('menuList');
const totalHTElt = document.getElementById('menuTotalHT');
const totalTTCElt = document.getElementById('menuTotalTTC');
const btnCalculer = document.getElementById('calculateMenuBtn');

function rafraichir() {
  if (listeMenu) {
    const commandesValides = moi.orders.filter(o => o.total > 0);

    const htmlMedias = commandesValides.map(o => {
      return `<li class="list-group-item">${o.meals[0].name}</li>`;
    });

    listeMenu.innerHTML = htmlMedias.join("");
  }

  const totalTTC = moi.orders.reduce((acc, o) => acc + o.total, 0);
  const totalHT = totalTTC / 1.2;

  if (totalTTCElt) totalTTCElt.textContent = totalTTC.toString();
  if (totalHTElt) totalHTElt.textContent = totalHT.toFixed(2);
}

if (btnCalculer) {
  btnCalculer.onclick = () => rafraichir();
}

async function init() {
  const repas = await fetchMeals();

  if (listeRepas) {
    repas.forEach((plat: Meal) => {
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = `${plat.name} - ${plat.price}€`;

      const btn = document.createElement('button');
      btn.className = "btn btn-sm btn-primary";
      btn.textContent = "Commander";

      btn.onclick = () => {
        try {
          moi.orderMeal(plat);
          rafraichir();
        } catch (e) {
          console.log("Erreur de solde");
        }
      };

      li.appendChild(btn);
      listeRepas.appendChild(li);
    });
  }
  
  rafraichir();
}

init();