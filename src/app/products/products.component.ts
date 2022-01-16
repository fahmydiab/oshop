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
  products: Product[] = [];
  filteredProducts: Product[] = [];
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
          this.products = Product.parseProducts(products);
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.details.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.cartSubscription$ = (
      await this.shoppingCartService.getCart()
    ).subscribe((cart) => (this.cart = cart));
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
    this.cartSubscription$.unsubscribe();
  }
}
