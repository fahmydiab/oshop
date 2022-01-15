import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy, OnInit {
  products$: Subscription;
  cartSubscription$: Subscription;
  products: [string, Product][] = [];
  filteredProducts: [string, Product][] = [];
  category: any;
  cart: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.products$ = productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = Object.entries<Product>(products);
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p[1].category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.cartSubscription$ = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe((cart) => (this.cart = cart));
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
    this.cartSubscription$.unsubscribe();
  }
}
