import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { allFoodProduct, foodProduct, User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  adminLogin(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/admin/login', data);
  }
  adminDashboard(data: any): Observable<allFoodProduct> {
    // const token = localStorage.getItem('jwt');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<allFoodProduct>(this.apiUrl + '/admin/dashboard', data);
  }
  getAllFoods(): Observable<allFoodProduct> {
    return this.http.get<allFoodProduct>(this.apiUrl + "/admin/getfoods")
  }
  deleteFood(id: any): Observable<allFoodProduct> {
    return this.http.delete<allFoodProduct>(this.apiUrl + "/admin/delete/" + id)
  }
}
