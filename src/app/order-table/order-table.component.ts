import { Component, Input } from '@angular/core';
import { Order } from '../models/order';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartSummaryComponent } from '../shopping-cart-summary/shopping-cart-summary.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent {
  @Input('orders')
  orders: Order[];

  constructor(public dialog: MatDialog) {}

  viewDetails(order: Order) {
    this.dialog.open(OrderSummaryComponent, {
      data: {
        order,
        totalItemsCount: order.items.reduce(function (a, b) {
          return a + b['quantity'];
        }, 0),
        totalPrice: order.items.reduce(function (a, b) {
          return a + b['quantity'];
        }, 0),
      },
    });
  }
}
