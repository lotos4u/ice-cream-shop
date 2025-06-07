import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Корзина</h1>
    <div *ngFor="let item of cart()">
      {{ item.name }} - {{ item.price }} €
    </div>
    <p *ngIf="cart().length === 0">Корзина пуста</p>
    <button (click)="clearCart()">Очистить корзину</button>
  `
})
export class Cart {
  private store = inject(StoreService);
  cart = computed(() => this.store.getCart());

  clearCart() {
    this.store.clearCart();
  }
}
