import { ProductDetails } from './product';
export class ShoppingCartItem {
  constructor(public product: ProductDetails, public quantity: number) {}

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
