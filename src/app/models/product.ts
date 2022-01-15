export class Product {
  key: string;
  details: ProductDetails;

  static parseProducts(products: any) {
    return Object.entries<any>(products).map(e => {
      let p = new Product();
      p.key = e[0];
      p.details = e[1];
      return p;
    });
  }
}
export interface ProductDetails {
  category: string;
  price: number;
  title: string;
  url: string;
}
