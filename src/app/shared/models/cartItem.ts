import { Products } from "./products"

export class CartItem{
 id?:string;
 productId: string;
 productName: string;
 quantity: number;
 price: number;
 imageUrl: string;

  constructor(id: string, products: Products, quantity = 1){
    this.id = id;
    this.productId = products.id;
    this.productName = products.name;
    this.quantity = quantity;
    this.price = products.price;
    this.imageUrl = products.imageUrl;
  }


}
