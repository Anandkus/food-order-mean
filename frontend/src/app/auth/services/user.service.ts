import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  userRegistraion(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/auth/res', data);
  }
  userLogin(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/auth/login', data);
  }
}
