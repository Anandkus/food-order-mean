import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if the token has expired
    if (!this.authService.checkTokenExpiration()) {
      this.router.navigateByUrl('/login');  // Redirect to login if expired
    }
  }
}
