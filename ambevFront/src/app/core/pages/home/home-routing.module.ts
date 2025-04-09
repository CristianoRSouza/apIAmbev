import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UsersHandlerComponent } from '../users/users-handler/users-handler.component';
import { HomeComponent } from './home.component';
import { UsersInfoComponent } from '../users/users-info/users-info.component';
import { ProductsListComponent } from '../products/products-list/products-list.component';
import { ProductsHandlerComponent } from '../products/products-handler/products-handler.component';
import { ProductsInfoComponent } from '../products/products-info/products-info.component';
import { ProductsCategoriesComponent } from '../products/products-categories/products-categories.component';
import { CartsListComponent } from '../carts/carts-list/carts-list.component';
import { CartsHandlerComponent } from '../carts/carts-handler/carts-handler.component';
import { CartsInfoComponent } from '../carts/carts-info/carts-info.component';
import { AuthGuard } from '../../guards/guards.guard';
import { SalesListComponent } from '../sales/sales-list/sales-list.component';
import { SalesHandlerComponent } from '../sales/sales-handler/sales-handler.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'users-list',
        pathMatch: 'full'
      },
      {
        path: 'products-list',
        component: ProductsListComponent
      },
      {
        path: 'product-categories',
        component: ProductsCategoriesComponent
      },
      {
        path: 'product-edit/:id',
        component: ProductsHandlerComponent
      },
      {
        path: 'product-create',
        component: ProductsHandlerComponent
      },
      {
        path: 'product-info/:id',
        component: ProductsInfoComponent
      },
      {
        path: 'users-list',
        component: UsersListComponent
      },
      {
        path: 'user-edit/:id',
        component: UsersHandlerComponent
      },
      {
        path: 'user-create',
        component: UsersHandlerComponent
      },
      {
        path: 'user-info/:id',
        component: UsersInfoComponent
      },
      {
        path: 'carts-list',
        component: CartsListComponent
      },
      {
        path: 'cart-edit/:id',
        component: CartsHandlerComponent
      },
      {
        path: 'cart-create',
        component: CartsHandlerComponent
      },
      {
        path: 'cart-info/:id',
        component: CartsInfoComponent
      },
      {
        path: 'sales-list',
        component: SalesListComponent
      },
      {
        path: 'sales-edit/:id',
        component: SalesHandlerComponent
      },
      {
        path: 'sales-create',
        component: SalesHandlerComponent
      },
      {
        path: 'sales-info/:id',
        component: SalesHandlerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
