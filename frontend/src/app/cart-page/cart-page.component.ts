import { Component } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/models/cartItem';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService, private fs: FoodService) {}

  ngOnInit() {
    this.setCart();
  }
  setCart() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }
}
