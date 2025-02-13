import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  adminReg!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: AdminServiceService,
    private authService: AuthService
  ) {
    this.adminReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  save() {
    if (this.adminReg.valid) {
      this.apiService.adminLogin(this.adminReg.value).subscribe(
        (data) => {
          if (data && data.token) {
            alert(data.message);
            this.adminReg.reset();
            this.authService.saveToken(data.token, data.user.role, data.user.fullname);
            this.router.navigateByUrl('/admin/dashboard');
          }
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }
}
