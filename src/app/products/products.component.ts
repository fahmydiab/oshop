import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy {
  products$: Subscription;
  products: [string, Product][] = [];
  filteredProducts: [string, Product][] = [];
  category: any;

  constructor(route: ActivatedRoute, productService: ProductService) {
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

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }
}
