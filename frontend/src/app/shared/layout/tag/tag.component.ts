import { Component, Input } from '@angular/core';
import { tag } from '../../models/Tag';
import { FoodService } from 'src/app/services/food/food.service';
import { category } from '../../models/food';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() foodPagetags?: any[];
  @Input() justifyContent?: string = 'center';
  tags: tag[] = [];
  categories: category[] = [];
  singleTag: any;
  constructor(private fs: FoodService) { }

  ngOnInit() {
    if (this.foodPagetags) {
      this.singleTag = this.foodPagetags;
    }
    else {
      this.fs.category().subscribe(data => {
        this.categories = data.category;
      }, error => { alert(error.error.message) })
    }
  }
}
