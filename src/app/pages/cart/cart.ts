import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreService} from '../../services/store.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {IMenuItem, IMenuOption, ISelectedItem} from '../../model';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatIconModule],
  templateUrl: 'cart.html',
  styleUrls: ['cart.scss'],
})
export class Cart {
  store = inject(StoreService);
  router = inject(Router);

  get cartTotal() {
    return this.store.getCartTotal();
  }

  get cartEmpty(): boolean {
    return this.store.cart().length === 0;
  }


  getAllowedOptions(item: IMenuItem): IMenuOption[] {
    return !this.store.options || !item ? this.store.options : this.store.options.filter(o => item.options.includes(o.id));
  }

  getMenuItems(): IMenuItem[] {
    return this.store.cart().map(selection => {
      return this.store.menu.filter(item => selection.menuItemId === item.id)[0];
    });
  }

  getItemTotalPrice(ind: number) {
    const amount = this.store.cart()[ind].amount;
    const menuItemId = this.store.cart()[ind].menuItemId;
    const item: IMenuItem = this.store.menu.filter(menuItem => menuItem.id === menuItemId)[0];
    let optionsCost = 0;
    this.store.options.filter(option => {
      optionsCost = 0;
      this.store.cart().forEach(s => {
        s.options?.forEach(selectedOption => {
          if (selectedOption === option.id) {
            optionsCost += option.price;
          }
        });
      });
    });
    return (item.price + optionsCost) * amount;
  }

  onOptionSelection(ind: number, optionId: string, status: boolean): void {
    this.store.updateOptionStatus(ind, optionId, status);
  }

  isOptionSelected(ind: number, optionId: string): boolean {
    return this.store.cart()[ind].options.includes(optionId);
  }

  clear(): void {
    this.store.clearCart();
  }

  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }

  remove(index: number) {
    this.store.removeFromCart(index);
  }

  increment(ind: number) {
    const amount = this.store.cart()[ind].amount + 1;
    this.store.setCartSelectionAmount(ind, amount);
  }

  decrement(ind: number) {
    const amount = this.store.cart()[ind].amount > 1 ? this.store.cart()[ind].amount - 1 : this.store.cart()[ind].amount;
    this.store.setCartSelectionAmount(ind, amount);
  }

}
