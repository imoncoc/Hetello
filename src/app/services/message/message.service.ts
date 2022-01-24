import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  cartSubject = new Subject<Products>();
  totalCartItem = new Subject<number>();

  constructor() { }

  sendMsg(product: Products){
    this.cartSubject.next(product);
  }

  getMessage(){
    return this.cartSubject;
  }

  sendTotalCartItem(Totalproduct: number){
    this.totalCartItem.next(Totalproduct);
  }

  getTotalCartItem(){
   return  this.totalCartItem;
  }


}
