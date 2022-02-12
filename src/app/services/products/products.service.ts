import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // _productApi = "http://localhost:3000/products";
  _productApiFirebase = "https://hetello-e-commarce-default-rtdb.firebaseio.com/products";
  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(`${this._productApiFirebase}.json`);
  }

  getProductById(id: string): Observable<Products>{
    return this.http.get<Products>(`${this._productApiFirebase}/${id}.json`);
  }

  saveProductData(data: any){
    return this.http.post(`${this._productApiFirebase}.json`, data);
  }




}
