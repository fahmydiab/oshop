import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: [string, { name: string }][];
  categories$: Subscription;
  product: Product={
    category: '',
    price: 0,
    title: '',
    url: ''
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categories = Object.entries(categories);
      });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
  }

  save(product: any) {
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {}
}
