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
  filteredProducts: [string, Product][];
  products$: Subscription;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = Object.entries(products);
    });
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

  filter(query: string) {
    console.log(query)
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p[1].title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}
}
