import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { category, Foods } from 'src/app/shared/models/food';
import { tag } from 'src/app/shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  category(): Observable<category> {
    return this.http.get<category>(this.apiUrl + "/food/tag")
  }

  getCategory(category: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/food/tag/" + category)
  }
  allFoods(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/food/")
  }
  searchByFoods(search: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/food/" + search)
  }
  foodById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/food/by/" + id)
  }
  // getFoodById(id: any): Foods {
  //   return this.getAll().find((food) => food.id == id)!;
  // }
  // getAllFoodByTag(tag: any): Foods[] {
  //   return tag === 'All'
  //     ? this.getAll()
  //     : this.getAll().filter((food) => food.tags?.includes(tag));
  // }
  // getTag(): tag[] {
  //   return [
  //     { name: 'All', count: 4 },
  //     { name: 'Fry', count: 5 },
  //     { name: 'Veg', count: 3 },
  //     { name: 'FastFood', count: 3 },
  //     { name: 'Burger', count: 3 },
  //     { name: 'Pizza', count: 3 },
  //   ];
  // }
  // getAll(): Foods[] {
  //   return [
  //     {
  //       id: 1,
  //       price: 699,
  //       name: 'sandwich',
  //       favorite: true,
  //       star: 3.4,
  //       tags: ['Veg', 'FastFood'],
  //       imageUrl: 'assets/images/first.jpg',
  //       cookTime: '15-20',
  //       origins: ['indian', 'Turki'],
  //     },
  //     {
  //       id: 2,
  //       price: 699,
  //       name: 'burger',
  //       favorite: true,
  //       star: 3.4,
  //       tags: ['Fry', 'FastFood'],
  //       imageUrl: 'assets/images/sec.jpg',
  //       cookTime: '5-10',
  //       origins: ['indian', 'Japan'],
  //     },
  //     {
  //       id: 3,
  //       price: 89,
  //       name: 'Biscuit',
  //       favorite: true,
  //       star: 3.4,
  //       tags: ['Fry', 'FastFood'],
  //       imageUrl: 'assets/images/third.jpg',
  //       cookTime: '5-10',
  //       origins: ['indian', 'England'],
  //     },
  //     {
  //       id: 4,
  //       price: 18,
  //       name: 'Pizza',
  //       favorite: false,
  //       star: 3.4,
  //       tags: ['Fry', 'FastFood'],
  //       imageUrl: 'assets/images/fourth.jpg',
  //       cookTime: '15-20',
  //       origins: ['indian', 'America', 'China'],
  //     },
  //   ];
  // }
}
