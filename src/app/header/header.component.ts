import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShown:boolean = false;
   totalCartItem = 0;

  constructor(private cartService: CartService,
              private msgService: MessageService) { }

  ngOnInit(): void {
    // this.cartService.getCartItem().subscribe((result) => {
    //   this.totalCartItem = result.length;
    // })
    this.msgService.getTotalCartItem().subscribe((result) =>{
      this.totalCartItem = result;
    })

  }


}
