import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { foodProduct } from 'src/app/shared/models/user';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  AdminForm!: FormGroup;
  selectedFile: File | null = null;
  food: any = [];

  constructor(
    private fb: FormBuilder,
    private apiService: AdminServiceService
  ) {
    this.AdminForm = this.fb.group({
      foodname: ['', [Validators.required]],
      price: [, [Validators.required]],
      desc: ['', [Validators.required]],
      foodtime: ['', [Validators.required]],
      category: ['', [Validators.required]],
      foodimg: [null, [Validators.required]],
    });
  }
  ngOnInit() {
    this.getAllfoods();
  }
  // Handle file input change event
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.AdminForm.patchValue({
        foodimg: file,
      });
    }
  }

  save() {
    const formData = new FormData();
    formData.append('foodname', this.AdminForm.get('foodname')?.value);
    formData.append('price', this.AdminForm.get('price')?.value);
    formData.append('desc', this.AdminForm.get('desc')?.value);
    formData.append('foodtime', this.AdminForm.get('foodtime')?.value);
    formData.append('category', this.AdminForm.get('category')?.value);
    // Add the image file
    formData.append('foodimg', this.AdminForm.get('foodimg')?.value);
    this.apiService.adminDashboard(formData).subscribe(
      (data) => {
        if (data) {
          alert(data.message);
          this.AdminForm.reset();
          this.getAllfoods();
        }
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  getAllfoods() {
    this.apiService.getAllFoods().subscribe(data => {
      if (data && data.food) {
        this.food = data.food;
      }
    }, (error) => {
      alert(error.error.message);
    })
  }

  deletefood(id: any) {
    this.apiService.deleteFood(id).subscribe(data => {
      if (data) {
        alert(data.message);
        this.getAllfoods();
      }
    }, (error) => {
      alert(error.error.message);
    })
  }
}
