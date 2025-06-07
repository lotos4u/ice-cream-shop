import {Injectable, Provider, signal, WritableSignal} from '@angular/core';

export interface MenuItem {
  name: string;
  price: number;
  amount: number;
  image: string;
  description: string;
  options: { name: string; price: number; selected: boolean }[];
}

@Injectable({providedIn: 'root'})
export class StoreService {
  cart: WritableSignal<MenuItem[]> = signal([]);
  orderStatus: WritableSignal<string> = signal('Pending');

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        this.cart.set(JSON.parse(storedCart));
      } catch {
      }
    }

    const storedStatus = localStorage.getItem('orderStatus');
    if (storedStatus) {
      this.orderStatus.set(storedStatus);
    }
  }

  addToCart(item: MenuItem) {
    const updated = [...this.cart(), item];
    this.cart.set(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem('cart');
  }

  getCart(): MenuItem[] {
    return this.cart();
  }

  setOrderStatus(status: string) {
    this.orderStatus.set(status);
    localStorage.setItem('orderStatus', status);
  }

  getOrderStatus(): string {
    return this.orderStatus();
  }
}

export function provideStore(): Provider[] {
  return [StoreService];
}
