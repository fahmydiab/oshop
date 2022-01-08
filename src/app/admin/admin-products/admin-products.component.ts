import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: [string, Product][];
  products$: Subscription;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().subscribe((products) => {
      console.log(Object.entries(products));
      this.products = Object.entries(products);
    });
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

  ngOnInit(): void {}
}
