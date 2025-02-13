import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  count: number = 0;
  logged_in: boolean = false;
  user_role!: string | null;
  user_name!: string | null;
  constructor(private cartService: CartService, private router: Router, private authService: AuthService) { }

  ngDoCheck() {
    this.user_role = localStorage.getItem('role');
    this.user_name = localStorage.getItem('user');
    const jwt_token = localStorage.getItem('jwt');
    if (jwt_token) {
      this.logged_in = true;
    }
  }

  logOut() {
    this.authService.logout();
    this.logged_in = false;
  }
}
