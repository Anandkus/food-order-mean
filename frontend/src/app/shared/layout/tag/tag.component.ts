import { Component, Input } from '@angular/core';
import { tag } from '../../models/Tag';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() foodPagetags?: string[];
  @Input() justifyContent?: string = 'center';
  tags: tag[] = [];
  constructor(private fs: FoodService) {}
  ngOnInit() {
    if (!this.foodPagetags) this.tags = this.fs.getTag();
  }
}
