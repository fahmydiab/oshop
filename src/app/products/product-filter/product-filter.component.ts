import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnDestroy {
  categories$: Subscription;
  categories: [string, any][];

  @Input('category')
  category: any;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService
      .getAll()
      .subscribe(
        (categories) => (this.categories = Object.entries(categories))
      );
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
  }
}
