import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-nvbar',
  templateUrl: './bs-nvbar.component.html',
  styleUrls: ['./bs-nvbar.component.css'],
})
export class BsNvbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  cart$$: ShoppingCart;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser!));
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe((cart) => (this.cart$$ = cart));
  }

  logout() {
    this.auth.logout();
  }
}
