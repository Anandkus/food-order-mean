import { Component } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/models/cartItem';
import { FoodService } from '../services/food/food.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartDetails: any[] = [];
  id: any;
  imagePath: string = environment.imageUrl;
  totalProduct: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService, private fs: FoodService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.allCartDetails();
  }

  allCartDetails() {
    this.cartService.cartDetails().subscribe((data) => {
      if (data && data.cart) {
        this.cartDetails = data.cart;

        // Calculate total price by iterating over the cart items
        const totalPrice = this.cartDetails.reduce((sum, item) => {
          return sum + item.price;
        }, 0); // Initial value is 0

        // You can now use totalPrice for display or further logic
        this.totalPrice = totalPrice; // Save totalPrice in a variable if needed
      }
    }, (error) => {
      alert(error.error.message);
    });
  }

  removeFromCart(cartId: any) {
    this.cartService.deleteCart(cartId).subscribe(data => {
      if (data) {
        alert(data.message);
        this.allCartDetails();
      }
    }, (error) => {
      alert(error.error.message);
    })

  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    // this.cartService.changeQuantity(cartItem.food._id, quantity);
    // this.setCart();
  }
}
