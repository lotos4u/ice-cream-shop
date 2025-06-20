import { Routes } from '@angular/router';
import {AuthGuard} from './services/auth.service';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'menu', loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'payment', loadComponent: () => import('./pages/payment/payment').then(m => m.Payment) },
  { path: 'order-status', loadComponent: () => import('./pages/order-status/order-status').then(m => m.OrderStatus) },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory), canActivate: [AuthGuard] },
  { path: 'orders', loadComponent: () => import('./pages/orders/orders').then(m => m.Orders), canActivate: [AuthGuard] },
];
