import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Foods } from '../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods: any = [];
  imagePath: string = environment.imageUrl;
  constructor(private fs: FoodService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['searchItem']) {
        this.fs.searchByFoods(params['searchItem']).subscribe(data => {
          this.foods = data.food;
        }, error => {
          alert(error.error.message)
        })
      }
      else if (params['tags']) {
        this.fs.getCategory(params['tags']).subscribe(data => {
          this.foods = data.food;
        }, error => {
          alert(error.error.message)
        });
      }
      else {
        this.fs.allFoods().subscribe(data => {
          this.foods = data.food;
        }, error => {
          alert(error.error.message)
        })
      }
    });
  }

  toSinglePage(id: any) {
    this.router.navigate(['/food'], { queryParams: { id: id } });
  }


}
