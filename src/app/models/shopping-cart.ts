import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {
    this.setItems(
      Object.entries(items).map(
        (i) => new ShoppingCartItem(i[1].product, i[1].quantity)
      )
    );
  }
  setItems(items: ShoppingCartItem[]) {
    this.items = items;
  }

  get productIds(): string[] {
    return Object.keys(this.items);
  }

  get totalPrice(){
    let sum =0;
    for(let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }

  getItem(id: string) {
    return Object.entries(this.items).filter((e) => e[0] === id)[0][1];
  }
}
