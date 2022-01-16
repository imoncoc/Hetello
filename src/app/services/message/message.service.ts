import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  subject = new EventEmitter<Products>();

  constructor() { }

  sendMsg(product: Products){
    this.subject.emit(product);
  }

  getMessage(){
    return this.subject.asObservable();
  }
}
