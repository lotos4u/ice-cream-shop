import { Injectable, Provider } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';

export interface MenuItem {
  name: string;
  price: number;
  selected?: boolean;
  options: { name: string; selected?: boolean }[];
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  cart: WritableSignal<MenuItem[]> = signal([]);

  addToCart(item: MenuItem) {
    this.cart.update(cart => [...cart, item]);
  }

  clearCart() {
    this.cart.set([]);
  }

  getCart(): MenuItem[] {
    return this.cart();
  }
}

export function provideStore(): Provider[] {
  return [StoreService];
}
