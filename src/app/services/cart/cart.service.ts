import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cartItem';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _cartApi = "http://localhost:3000/cart"

  constructor(private http: HttpClient) { }

  getCartItem(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this._cartApi).pipe(
      map((result:any[]) => {
        let cartItems: CartItem[] = [];
        for(let item of result){
          cartItems.push(new CartItem(item.id, item.product, item.quantity))
        }
        return cartItems;
      })
    )
  }

  addProductToCart(product: Products):Observable<any>{
    return this.http.post(this._cartApi, {quatity: 1, product})
  }

  updateProductCart(cardData: CartItem, product: Products): Observable<any>{
    return this.http.patch(this._cartApi+ "/"+cardData.id, {quantity: cardData.quantity, product})
  }

  deleteProductById(id: any){
    return this.http.delete(`${this._cartApi}/${id}`);
  }


}
