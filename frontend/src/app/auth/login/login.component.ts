import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userReg!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: UserService,
    private authService: AuthService
  ) {
    this.userReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit() {

  }
  save() {
    if (this.userReg.valid) {
      this.apiService.userLogin(this.userReg.value).subscribe(
        (data) => {
          if (data && data.user.role === 'buyer') {
            alert(data.message);
            this.userReg.reset();
            this.authService.saveToken(data.token, data.user.role, data.user.fullname);
            this.router.navigateByUrl('/home');
          }
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }




}
