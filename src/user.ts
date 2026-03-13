import { Meal } from "./meals";
import { Order } from "./order";
import { TropPauvreErreur } from './error.js';

export class User {
  id: number;
  name: string;
  wallet: number;
  orders: Order[];

  constructor(id: number, name: string, wallet: number) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
    this.orders = [];
    this.load();
  }

  save() {
  localStorage.setItem("commandes", JSON.stringify(this.orders));
  localStorage.setItem("argent", this.wallet.toString()); 
  }

  load() {
    const dataCommandes = localStorage.getItem("commandes");
    if (dataCommandes) this.orders = JSON.parse(dataCommandes);

    const dataArgent = localStorage.getItem("argent");
    if (dataArgent) {
      this.wallet = parseFloat(dataArgent);
    }
  }

  
  addFunds(amount: number) {
    if (amount > 0) {
      this.wallet += amount;
      this.wallet = Math.round(this.wallet * 100) / 100;
      this.save();
    }
  }

  orderMenu(meals: Meal[]) {
    const total = meals.reduce((acc, m) => acc + m.price, 0);

    if (this.wallet < total) {
      const msg = `Fonds insuffisants\nRestant : ${this.wallet}€\nTotal Menu : ${total}€`;
      alert(msg);
      throw new TropPauvreErreur(msg);
    }

    this.wallet -= total;
    this.wallet = Math.round(this.wallet * 100) / 100;

    this.orders.push({
      id: Date.now(),
      meals: [...meals], // On utilise [...meals] pour copier la liste
      total: total
    });

    this.save();
  }

  deleteOrder(id: number) {
    this.orders = this.orders.filter(o => o.id !== id);
    this.save();
  }
}