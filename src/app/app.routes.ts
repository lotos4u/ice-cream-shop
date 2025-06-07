import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'payment', loadComponent: () => import('./pages/payment/payment').then(m => m.Payment) },
  { path: 'order-status', loadComponent: () => import('./pages/order-status/order-status').then(m => m.OrderStatus) },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory) },
  { path: 'orders', loadComponent: () => import('./pages/orders/orders').then(m => m.Orders) },
];
