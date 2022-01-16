import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { Products } from 'src/app/shared/models/products';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];

  constructor(private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.productsService.getAllProducts().subscribe((res) => {
    //   this.products = res;
    // })

    this.route.params.subscribe(params => {
        this.productsService.getAllProducts().subscribe((res) => {
          this.products = res
        })


    })
  }

  onSelect(data:any){
    this.router.navigate(["products/" + data.id])
  }

  sortHighToLow(){
    this.products.sort((a:any, b:any) => a.price - b.price);
  }

  sortLowToHigh(){
    this.products.sort((a:any, b:any) => b.price - a.price);
  }

  openDialog(){
    this.dialog.open(DialogExampleComponent);
  }


}
