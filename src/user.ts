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

  orderMeal(meal: Meal) {
    let argent = typeof this.wallet === "number" ? this.wallet : 0;

    if (argent < meal.price) {
      const msg = `Fonds insuffisants\nPrix restant : ${argent}€\nPrix total : ${meal.price}€`;
      alert(msg);
      throw new TropPauvreErreur(msg);
    }

    if (typeof this.wallet === "number") {
      this.wallet -= meal.price;
    }

    this.orders.push({
      id: Date.now(),
      meals: [meal],
      total: meal.price
    });

    this.save();
  }
}