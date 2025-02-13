import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  userReg!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: UserService,
    private router: Router
  ) {
    // Initialize the form group
    this.userReg = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  save() {
    if (this.userReg.valid) {
      this.apiService.userRegistraion(this.userReg.value).subscribe(
        (data) => {
          if (data) {
            alert(data.message);
            this.userReg.reset();
            this.router.navigateByUrl('/login');
          }
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Form is invalid!');
    }
  }
}
