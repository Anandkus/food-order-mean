import { Component } from '@angular/core';
import { Foods } from '../shared/models/food';
import { FoodService } from '../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  food!: Foods;

  constructor(
    private fs: FoodService,
    acRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    acRoute.params.subscribe((params) => {
      if (params['id']) {
        this.food = fs.getFoodById(params['id']);
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
