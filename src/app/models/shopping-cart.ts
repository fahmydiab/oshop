import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[]=[];

  constructor(
    private itemList: [ productId: string, item: ShoppingCartItem ][]
  ) {
    itemList.forEach((i) =>
      this.items.push(
        new ShoppingCartItem(i[0], i[1].product, i[1].quantity)
      )
    );
  }

  getQuantity(product: Product) {
    let item = this.itemList.find(
      (item) => item[0] === product.key
    );
    return item ? item[1].quantity : 0;
  }

  setItems(items: ShoppingCartItem[]) {
    this.items = items;
  }

  get productIds(): string[] {
    return Object.keys(this.items);
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
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
