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

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   dataSource: Products = new Products();

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
      const id = params['id'];

      this.productsService.getProductById(id).subscribe((product: Products) => {
        this.dataSource = product;
      })
    })
  }


  handleAddToCart(){
    this.msg.sendMsg(this.dataSource);
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
