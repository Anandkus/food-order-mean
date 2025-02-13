import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { Foods } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItem';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addcart(foodData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/cart/add", foodData);
  }
  cartDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/cart/data");
  }
  deleteCart(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/cart/delete/" + id)
  }

}
