import { Meal } from "./meals";
import { Order } from "./order";
import { TropPauvreErreur } from './error.js';

export class User {
  id: number;
  name: string;
  wallet: number | object;
  orders: Order[];

  constructor(id: number, name: string, wallet: number | object) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
    this.orders = [];
    this.load();
  }

  save() {
    localStorage.setItem("commandes", JSON.stringify(this.orders));
  }

  load() {
    const data = localStorage.getItem("commandes");
    if (data) {
      this.orders = JSON.parse(data);
    }
  }

  
  addFunds(amount: number) {
    if (amount > 0) {
      if (typeof this.wallet === "number") {
        this.wallet += amount;
      }
      this.save();
    }
  }


  orderMenu(meals: Meal[]) {
    const total = meals.reduce((acc, m) => acc + m.price, 0);
    let argent = typeof this.wallet === "number" ? this.wallet : 0;

    if (argent < total) {
      const msg = `Fonds insuffisants\nRestant : ${argent}€\nTotal Menu : ${total}€`;
      alert(msg);
      throw new TropPauvreErreur(msg);
    }

    if (typeof this.wallet === "number") {
      this.wallet -= total;
    }

    this.orders.push({
      id: Date.now(),
      meals: meals,
      total: total
    });

    this.save();
  }

  deleteOrder(id: number) {
    this.orders = this.orders.filter(o => o.id !== id);
    this.save();
  }
}