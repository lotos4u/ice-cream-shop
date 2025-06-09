import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreService} from '../../services/store.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {IMenuItem, ISelectedItem} from '../../model';
import {Router} from '@angular/router';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: 'cart.html',
  styleUrls: ['cart.scss'],
})
export class Cart {
  store = inject(StoreService);
  router = inject(Router);

  total = computed(() => {
    const itemToPrice: any = {}
    this.store.menu.forEach(item => {
      itemToPrice[item.id] = item.price;
    });
    const optionToPrice: any = {}
    this.store.options.forEach(option => {
      optionToPrice[option.id] = option.price;
    });

    let optionsCost = 0;
    let itemsCost = 0;
    this.store.cart().forEach(s => {
      itemsCost += itemToPrice[s.menuItemId];
      s.options?.forEach(selectedOption => {
        optionsCost += optionToPrice[selectedOption];
      });
    });
    // this.store.getCart().forEach(selection => {
    //   val += selection.amount * itemToPrice[selection.menuItemId];
    //   selection.options?.forEach(optionId => {
    //     val += optionToPrice[optionId];
    //   });
    // });
    return itemsCost + optionsCost;
  });

  getMenuItems(): IMenuItem[] {
    const items = this.store.cart().map(selection => {
      return this.store.menu.filter(item => selection.menuItemId === item.id)[0];
    });
    console.log(this.store.cart(), items);
    return items;
  }

  clear(): void {
    this.store.clearCart();
  }

  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }

  remove(index: number) {
    const cart = [...this.store.getCart()];
    cart.splice(index, 1);
    this.store.cart.set(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  increment(item: ISelectedItem) {
    // console.log('increment before', this.store.cart);
    // const amount = item.amount++;
    // this.store.setCartSelectionAmount(item.id, amount);
  }

  decrement(item: ISelectedItem) {
    // console.log('decrement before', this.store.cart);
    // const amount = item.amount > 1 ? item.amount-- : item.amount;
    // this.store.setCartSelectionAmount(item.id, amount);
  }

  updateStorage() {
    this.store.cart.set([...this.store.getCart()]);
    localStorage.setItem('cart', JSON.stringify(this.store.getCart()));
  }
}
