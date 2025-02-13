import { Component } from '@angular/core';
import { Foods } from '../shared/models/food';
import { FoodService } from '../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  food!: any;;
  id: any;
  imagePath: string = environment.imageUrl;
  constructor(
    private fs: FoodService,
    private acRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    this.acRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.fs.foodById(this.id).subscribe(data => {
          this.food = data.food;
        }, error => { alert(error.error.message) })
      }
    });
  }

  addToCart(id: any) {
    // this.cartService.addToCart(this.food);
    const foodData = {
      cartId: id
    }
    this.cartService.addcart(foodData).subscribe(data => {
      if (data) {
        alert(data.message)
        this.router.navigate(['/cart-page'], { queryParams: { id: id } });
      }
    }, error => { alert(error.error.message) })
  }
}
