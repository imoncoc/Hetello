import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/models/cartItem';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // _cartApi = "http://localhost:3000/cart";
  _cartApiFirebase = "https://hetello-e-commarce-default-rtdb.firebaseio.com/cart";

  constructor(private http: HttpClient) { }



  getCartItem(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${this._cartApiFirebase}.json`).pipe(
      map((responseData: { [key: string]: any }) => {
        let cartItems: CartItem[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            cartItems.push({ ...responseData[key], id: key});
          }
          // console.log(`${cartItems[0].id}`);
        }
        return cartItems;
      })
    )
  }

  addProductToCart(cartdata: CartItem):Observable<any>{
    return this.http.post(`${this._cartApiFirebase}.json`, cartdata)
  }

  updateProductCart(cardData: CartItem, product: Products): Observable<any>{
    return this.http.patch(`${this._cartApiFirebase}/${cardData.id}.json`,{quantity: cardData.quantity, product})
  }

  deleteProductById(id: any){
    return this.http.delete(`${this._cartApiFirebase}/${id}.json`);
  }


}
