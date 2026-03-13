
export class User {
  id: number;
  name: string;
  wallet: number;

  constructor(id: number, name: string, wallet: number) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
  }

}