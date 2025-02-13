import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  saveToken(token: string, role: string, user: string): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', user);

    // Set the expiration time (1 hour from now)
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
    localStorage.setItem('tokenExpiration', expirationTime.toString());

    // Automatically log out the user after 1 hour
    setTimeout(() => {
      this.logout();
    }, 60 * 60 * 1000); // 1 hour in milliseconds
  }

  checkTokenExpiration(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
      this.logout();
      return false;
    }
    return true;
  }
  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
    // alert('Session has expired, please log in again.');
    this.router.navigate(['/login']);  // Redirect user to login page
  }

}
