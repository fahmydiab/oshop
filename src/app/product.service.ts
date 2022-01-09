import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any> {
    return this.db.object('/products').valueChanges();
  }

  get(id: string): Observable<any> {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id: string, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string){
    return this.db.object('/products/' + id).remove();
  }
}
