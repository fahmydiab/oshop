import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  products$: Subscription;
  items: Product[] = [];
  itemCount: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = Product.parseProducts(products);
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 2,
    };
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
