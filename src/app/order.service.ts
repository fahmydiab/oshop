import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list<Order>('/orders').valueChanges();
  }

  getOrderByUser(userId: string) {
    return this.db.list<Order>('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId)
    );
  }
}
