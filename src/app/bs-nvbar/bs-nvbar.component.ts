import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-nvbar',
  templateUrl: './bs-nvbar.component.html',
  styleUrls: ['./bs-nvbar.component.css'],
})
export class BsNvbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser!));
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      if(!cart) return;
      for(let productId in cart?.items)
        this.shoppingCartItemCount += cart?.items[productId].quantity;
    })
  }

  logout() {
    this.auth.logout();
  }
}
