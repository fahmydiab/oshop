import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product')
  product: Product;

  @Input('show-actions')
  showActions = true;

  @Input('shopping-cart')
  shoppingCart: any;

  constructor(private cartservice: ShoppingCartService) {}

  addToCart() {
    this.cartservice.addToCart(this.product);
  }

  removeFromCart() {
    this.cartservice.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
