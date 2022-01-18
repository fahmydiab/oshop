import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent {
  @Input('orders')
  orders: Order[];
}
