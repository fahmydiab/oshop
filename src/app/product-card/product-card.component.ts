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
  product: [string, Product];

  @Input('show-actions')
  showActions = true;

  constructor(private cartservice: ShoppingCartService) {}

  addToCart(product: [string,Product]) {
    this.cartservice.addToCart(product);
  }
}
