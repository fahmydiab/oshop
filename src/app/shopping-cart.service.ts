import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create(): any {
    return this.db.list('/shopping-carts').push({
      dateCraeted: new Date().getTime(),
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: [string, Product]) {
    let cartId = await this.getOrCreateCartId();
    let item$$ = this.getItem(cartId, product[0]);
    let item$ = item$$.valueChanges();

    item$.pipe(take(1)).subscribe((item) => {
      if (item !== null)
        item$$.update({ product: product[1], quantity: item.quantity + 1 });
      else item$$.update({ product: product[1], quantity: 1 });
    });
  }

  private getItem(cartId: any, productId: string) {
    return this.db.object<any>(
      '/shopping-carts/' + cartId + '/items' + productId
    );
  }
}
