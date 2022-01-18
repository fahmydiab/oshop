import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object<any>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x) => {
          if (!x.items) return new ShoppingCart([]);
          return new ShoppingCart(Object.entries(x.items));
        })
      );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private create(): any {
    return this.db.list('/shopping-carts/').push({
      dateCraeted: new Date().getTime(),
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$$ = this.getItem(cartId, product);
    let item$ = item$$.valueChanges();
    item$.pipe(take(1)).subscribe((item) => {
      if (item && item!.quantity + change === 0) item$$.remove();
      else {
        item$$.update({
          product: product.details,
          quantity: item ? item.quantity + change : change,
        });
      }
    });
  }

  private getItem(cartId: any, product: Product) {
    let item = this.db.object<ShoppingCartItem>(
      '/shopping-carts/' + cartId + '/items/' + product.key
    );
    return item;
  }
}
