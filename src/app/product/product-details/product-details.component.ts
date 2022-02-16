import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { MessageService } from 'src/app/services/message/message.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Products } from 'src/app/shared/models/products';

import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   dataSource: Products = new Products();
   productId: string = '';

   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';
   durationInSeconds = 1.5;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private router: Router,
              private cartService: CartService,
              private msg: MessageService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];

      this.productsService.getProductById(this.productId).subscribe((product: Products) => {
        product.id = this.productId;
        this.dataSource = product;
      })
    })
  }


  handleAddToCart(){
    this.msg.sendMsg(this.dataSource);

    this.cartService.getCartById(this.dataSource.id).subscribe(result => {
      debugger
      if (result) {

      }
      else {
        let cartData: CartItem = {
          id: this.dataSource.id,
          productId: this.dataSource.id,
          productName: this.dataSource.name,
          quantity: 1,
          price: this.dataSource.price,
          imageUrl: this.dataSource.imageUrl
        }

        this.cartService.addProductToCart(cartData).subscribe((resp) =>{
          if(resp) {
            ProductsService.onCartUpdate.emit({status: "Success"});
            // this.cartItems[cartIndex] = cartData;
            // this.calcCartTotal();
            this.openSnackBar();

          }
        })
      }
    })
  }

  // openSnackBar(message: any, action: any){
  //   this.snackBar.open(message, action, {duration: 2000})
  // }

  openSnackBar(){
    this.snackBar.open("Product Added To Cart Successful", "Dismiss", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    } )
  }


}
