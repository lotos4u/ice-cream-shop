import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  template: `
    <!--    <h1>Cart</h1>-->
    <div *ngIf="store.getCart().length === 0">No items in cart.</div>
    <ng-container *ngIf="store.getCart().length > 0">
      <h2>Total: {{ total() | number:'1.2-2' }} €</h2>
      <div class="cart-container">
        <mat-card *ngFor="let item of store.getCart(); let i = index" class="cart-card mat-elevation-z3">
          <mat-card-header>
            <mat-card-title>{{ item.name }}</mat-card-title>
            <mat-card-subtitle>{{ item.description }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>Base Price: {{ item.price }} €</p>

            <div class="options">
              <p>Options:</p>
              <mat-checkbox *ngFor="let opt of item.options" [(ngModel)]="opt.selected"
                            (ngModelChange)="updateStorage()">
                {{ opt.name }} (+{{ opt.price }} €)
              </mat-checkbox>
            </div>

            <div class="quantity-selector">
              <button mat-mini-button (click)="decrement(item)">-</button>
              <span>{{ item.amount }}</span>
              <button mat-mini-button (click)="increment(item)">+</button>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="warn" (click)="remove(i)">Remove</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .cart-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
      }
      .options {
        margin-top: 10px;
      }
      .total {
        margin-top: 32px;
        text-align: right;
        font-size: 1.5em;
        font-weight: bold;
      }
    `
  ]
})
export class Cart {
  store = inject(StoreService);

  total = computed(() => {
    return this.store.getCart().reduce((sum, item) => {
      const optionTotal = item.options.filter(o => o.selected).reduce((optSum, opt) => optSum + opt.price, 0);
      return sum + (item.price + optionTotal) * item.amount;
    }, 0);
  });

  remove(index: number) {
    const cart = [...this.store.getCart()];
    cart.splice(index, 1);
    this.store.cart.set(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  increment(item: any) {
    item.amount++;
    this.updateStorage();
  }

  decrement(item: any) {
    if (item.amount > 1) item.amount--;
    this.updateStorage();
  }

  updateStorage() {
    this.store.cart.set([...this.store.getCart()]);
    localStorage.setItem('cart', JSON.stringify(this.store.getCart()));
  }
}
