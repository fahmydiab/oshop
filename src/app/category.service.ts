import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories():Observable<any> {
    return this.db.object('/categories') !== null
      ? this.db.object('/categories').valueChanges()
      : of(null);
  }
}
