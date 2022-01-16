import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {

  @Input('product')
  product: Product;

  @Input('shopping-cart')
  shoppingCart: any;

  constructor(private cartservice: ShoppingCartService) {}

  addToCart() {
    this.cartservice.addToCart(this.product);
  }

  removeFromCart() {
    this.cartservice.removeFromCart(this.product);
  }
}
