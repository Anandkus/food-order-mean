import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {
  AdminAuthGuardLogin,
  AdminAuthGuardService,
} from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AdminAuthGuardLogin],
    component: AdminLoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AdminAuthGuardService],
    component: AdminDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
