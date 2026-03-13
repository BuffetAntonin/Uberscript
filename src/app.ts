import { fetchMeals } from './api.js';
import { User } from './user.js';
import { Meal } from './meals.js';

const utilisateur = new User(1, "Antonin", 100);
let selectionActuelle: Meal[] = [];

const listeRepas = document.getElementById('mealList');
const listeMenu = document.getElementById('menuList');
const listeCommandes = document.getElementById('orderHistory');
const totalTTCElt = document.getElementById('menuTotalTTC');
const btnValider = document.getElementById('calculateMenuBtn');
const bandeauArgent = document.getElementById('wallet');

function rafraichir() {
  if (bandeauArgent) {
    bandeauArgent.textContent = `Argent : ${utilisateur.wallet}€`;
  }

  if (listeMenu) {
    listeMenu.innerHTML = "";
    selectionActuelle.forEach((plat, index) => {
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between";
      li.textContent = plat.name;
      
      const btnRetirer = document.createElement('button');
      btnRetirer.className = "btn btn-sm btn-danger";
      btnRetirer.textContent = "X";
      btnRetirer.onclick = () => {
        selectionActuelle.splice(index, 1);
        rafraichir();
      };
      
      li.appendChild(btnRetirer);
      listeMenu.appendChild(li);
    });
  }

  if (listeCommandes) {
    listeCommandes.innerHTML = "";
    utilisateur.orders.forEach(commande => {
      const li = document.createElement('li');
      li.className = "list-group-item";
      const noms = commande.meals.map(m => m.name).join(", ");
      li.textContent = `Commande #${commande.id} : [${noms}] - ${commande.total}€`;
      listeCommandes.appendChild(li);
    });
  }

  const totalProvisoire = selectionActuelle.reduce((acc, m) => acc + m.price, 0);
  if (totalTTCElt) totalTTCElt.textContent = totalProvisoire.toString();
}

const btnPlusArgent = document.createElement('button');
btnPlusArgent.textContent = "＋ Ajouter de l'argent";
btnPlusArgent.className = "btn btn-warning btn-sm ms-3 fw-bold";

if (bandeauArgent) {
  bandeauArgent.parentElement?.appendChild(btnPlusArgent);
  
  btnPlusArgent.onclick = () => {
    const reponse = prompt("Montant à ajouter au portefeuille :");
    if (reponse) {
      const montant = parseFloat(reponse);
      if (!isNaN(montant) && montant > 0) {
        utilisateur.addFunds(montant);
        rafraichir();
      }
    }
  };
}

if (btnValider) {
  btnValider.textContent = "Valider et Payer le Menu";
  btnValider.onclick = () => {
    if (selectionActuelle.length === 0) return;
    try {
      utilisateur.orderMenu(selectionActuelle);
      selectionActuelle = [];
      rafraichir();
    } catch (e) {
      console.log("Paiement refusé");
    }
  };
}

async function init() {
  try {
    const repas = await fetchMeals();
  if (listeRepas) {
    repas.forEach((plat) => {
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = `${plat.name} - ${plat.price}€`;

      const btn = document.createElement('button');
      btn.className = "btn btn-sm btn-success";
      btn.textContent = "+ Ajouter";
      btn.onclick = () => {
        selectionActuelle.push(plat);
        rafraichir();
      };

      li.appendChild(btn);
      listeRepas.appendChild(li);
    });
  }
  }catch (e: any) {
    alert(e.message);
    if (listeRepas) {
      listeRepas.innerHTML = `<li class="list-group-item text-danger">Impossible de charger la carte.</li>`;
    }
  }
  
  rafraichir();
}

init();