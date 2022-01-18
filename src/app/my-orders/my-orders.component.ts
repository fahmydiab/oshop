import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => this.orderService.getOrderByUser(u.id).valueChanges())
    );
  }
}
