import {Injectable, Provider, signal, WritableSignal} from '@angular/core';
import {IMenuItem, IMenuOption, ISelectedItem} from '../model';
import {MENU, OPTIONS} from './data';

export enum EOrderStatus {
  empty = 'Empty',
  order = 'Ordering',
  payment = 'Payment in progress',
  paid = 'Paid',
  complete = 'Complete',
}

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
  options: IMenuOption[] = OPTIONS;

  menu: IMenuItem[] = MENU;

  cart: WritableSignal<ISelectedItem[]> = signal([]);

  orderStatus: WritableSignal<EOrderStatus> = signal(EOrderStatus.empty);

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        this.cart.set(JSON.parse(storedCart));
      } catch {
        console.warn('Parse error:', storedCart);
      }
    }

    const storedStatus: EOrderStatus = <EOrderStatus>localStorage.getItem('orderStatus');
    if (storedStatus) {
      this.orderStatus.set(storedStatus);
    }
  }

  getCartTotal() {
    const itemToPrice: any = {}
    this.menu.forEach(item => {
      itemToPrice[item.id] = item.price;
    });
    const optionToPrice: any = {}
    this.options.forEach(option => {
      optionToPrice[option.id] = option.price;
    });

    let optionsCost = 0;
    let itemsCost = 0;
    this.cart().forEach(s => {
      itemsCost += itemToPrice[s.menuItemId] * s.amount;
      s.options?.forEach(selectedOption => {
        optionsCost += optionToPrice[selectedOption] * s.amount;
      });
    });
    return itemsCost + optionsCost;
  }

  addToCart(items: ISelectedItem[]) {
    items.forEach(item => {
      const existing: ISelectedItem[] = JSON.parse(JSON.stringify(this.cart()));
      const oldOptionIndex = existing.findIndex(selected => {
        return selected.menuItemId === item.menuItemId && this.isSameOptions(item.options, selected.options);
      });
      if (oldOptionIndex === -1) {
        this.setCart([...existing, item]);
      } else {
        existing[oldOptionIndex].amount += item.amount;
        this.setCart([...existing]);
      }
    });
  }

  isSameOptions(a: string[], b: string[]): boolean {
    if (!a && !b) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!b.includes(a[i]) || !a.includes(b[i])) {
        return false;
      }
    }
    return true;
  }

  setCart(items: ISelectedItem[]): void {
    this.cart.set(items);
    this.updateCartInStorage();
  }

  removeFromCart(index: number): void {
    const cart = [...this.cart()];
    cart.splice(index, 1);
    this.cart.set(cart);
    this.updateCartInStorage();
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem('cart');
  }

  getCart(): ISelectedItem[] {
    return this.cart();
  }

  setOrderStatus(status: EOrderStatus) {
    this.orderStatus.set(status);
    this.saveToStorage('orderStatus', status);
  }

  getOrderStatus(): string {
    return this.orderStatus();
  }

  updateOptionStatus(ind: number, optionId: string, status: boolean): void {
    if (status && !this.cart()[ind].options?.includes(optionId)) {
      this.cart()[ind].options?.push(optionId);
      this.setCart([...this.cart()]);
    } else if (!status && this.cart()[ind].options?.includes(optionId)) {
      this.cart()[ind].options = this.cart()[ind].options.filter(o => o !== optionId);
      this.setCart([...this.cart()]);
    }
  }

  public setCartSelectionAmount(ind: number, amount: number): void {
    this.cart()[ind].amount = amount;
    this.updateCartInStorage();
  }

  private updateCartInStorage() {
    this.saveToStorage('cart', JSON.stringify(this.cart()));
  }

  private saveToStorage(key: string, data: any): void {
    localStorage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
  }
}

export function provideStore(): Provider[] {
  return [StoreService];
}
