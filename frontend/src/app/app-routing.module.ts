import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {
  BuyerAuthGuardLogin,
  buyerAuthGuardService,
} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    canActivate: [BuyerAuthGuardLogin],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'search/:searchItem',
    component: HomeComponent,
  },
  {
    path: 'tag/:tags',
    component: HomeComponent,
  },
  {
    path: 'food',
    canActivate: [buyerAuthGuardService],
    component: FoodPageComponent,
  },
  {
    path: 'cart-page',
    canActivate: [buyerAuthGuardService],
    component: CartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
