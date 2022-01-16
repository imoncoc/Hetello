import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartService } from '../services/cart/cart.service';
import { MessageService } from '../services/message/message.service';
import { CartItem } from '../shared/models/cartItem';
import { Products } from '../shared/models/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Array<CartItem> = [];
  cartTotal: number = 0;
  _cartApi = 'http://localhost:3000/cart';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 1.5;

  constructor(
    private msg: MessageService,
    private cartService: CartService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMessage().subscribe((product: Products) => {
      if (product && product.id) {
        const cartIndex = this.cartItems.findIndex(
          (data: CartItem) => data.productId === product.id
        );
        debugger;
        if (cartIndex === -1) {
          this.cartService.addProductToCart(product).subscribe(() => {
            console.log(product);
            this.loadCartItems();
          });
        } else {
          const cartData = this.cartItems[cartIndex];
          cartData.quantity++;
          this.cartService
            .updateProductCart(cartData, product)
            .subscribe((resp) => {
              if (resp) {
                this.cartItems[cartIndex] = cartData;
                this.calcCartTotal();
              }
            });
        }
      }
    });
  }

  loadCartItems() {
    this.cartService.getCartItem().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calcCartTotal();
    });
  }

  deleteSingleProduct(productId: any) {
    this.cartService.deleteProductById(productId).subscribe((result) => {
      this.ngOnInit();
    });
  }

  calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.quantity * item.price;
    });
  }

  clearCart() {
    this.cartItems.forEach((item: CartItem) => {
      this.http
        .delete(this._cartApi + '/' + item.id)
        .subscribe((res: any) => {});
    });

    this.cartItems = [];
  }

  openSnackBar(message: any) {
    this.snackBar.open(message, 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
