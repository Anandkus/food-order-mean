import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
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
    path: 'food/:id',
    component: FoodPageComponent,
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
