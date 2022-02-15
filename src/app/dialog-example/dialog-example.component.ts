import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {
  addProductForm: FormGroup = new FormGroup({});

  constructor( private productsService: ProductsService,
    private matDialogRef: MatDialogRef<DialogExampleComponent>) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      // 'position' : new FormControl('', Validators.required),
      'name' : new FormControl('', Validators.required),
      'price' : new FormControl('', Validators.required),
      'tags' : new FormControl('', Validators.required),
      'origins' : new FormControl('', Validators.required),
      'stars' : new FormControl('', Validators.required),
      'favorite' : new FormControl('', Validators.required),
      'cookTime' : new FormControl('', Validators.required),
      'imageUrl': new FormControl('', Validators.required),
      'description' : new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    // console.log(this.addProductForm.value);
    this.productsService.saveProductData(this.addProductForm.value).subscribe({
      next: (res: any) =>{

        if (res && res["name"]) {
          const insertID = res["name"];
          const data = Object.assign({id: insertID}, this.addProductForm.value);
          ProductsService.onProductSave.emit(data);
          alert("Updated Successfully");
        } else {
          alert("Updated Failed");
        }

        this.matDialogRef.close('save');
      },
      error:()=>{
        alert("Error while adding the product")
      }
    })
  }

}
