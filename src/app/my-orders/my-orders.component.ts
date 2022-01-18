import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => {
        if (u) return this.orderService.getOrderByUser(u.uid).valueChanges();
        return of([]);
      })
    );
  }
}
