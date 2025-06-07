import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="mat-elevation-z2">
      <mat-card-header>
        <mat-card-title>Cart</mat-card-title>
        <mat-card-subtitle>Your selected items</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div *ngFor="let item of cart()">
          {{ item.name }} - {{ item.price }} €
        </div>
        <p *ngIf="cart().length === 0">Cart is empty</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="clearCart()">Clear Cart</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class Cart {
  private store = inject(StoreService);
  cart = computed(() => this.store.getCart());

  clearCart() {
    this.store.clearCart();
  }
}
