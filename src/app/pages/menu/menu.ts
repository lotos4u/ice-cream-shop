import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
<!--    <h1>Ice Cream Menu</h1>-->
    <div class="menu-container">
      <mat-card *ngFor="let item of menu; let i = index" class="menu-card mat-elevation-z4">
        <mat-card-header>
          <mat-card-title><span class="title"><span>{{ item.name }}</span> <span>{{ item.price }} €</span></span></mat-card-title>
          <mat-card-subtitle>{{ item.description }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>

          <img mat-card-image [src]="item.image" alt="{{ item.name }}">

          <div class="options">
            <mat-checkbox *ngFor="let opt of item.options" [(ngModel)]="opt.selected">
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
          <button mat-raised-button color="primary" (click)="addSingleItem(item)">
            Add to Cart
          </button>
          <button *ngIf="isLoggedIn()" mat-button color="warn" (click)="deleteItem(i)">
            Delete
          </button>
        </mat-card-actions>
      </mat-card>
    </div>

    <div class="actions" *ngIf="isLoggedIn()">
      <h3>Edit Menu</h3>
      <button mat-stroked-button (click)="addItem()">Add Item</button>
    </div>
  `,
  styles: [
    `
      .menu-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
        margin-top: 20px;
      }

      .menu-card img {
        height: 180px;
        min-height: 180px;
        object-fit: cover;
      }

      .mat-mdc-card-header {
        display: unset;
      }

      .title {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .options {
        margin-top: 10px;
      }

      .actions {
        margin-top: 30px;
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
      }
    `
  ]
})
export class Menu {
  private store = inject(StoreService);
  private auth = inject(AuthService);

  menu = [
    {
      name: 'Vanilla',
      description: 'Classic vanilla ice cream.',
      image: 'https://via.placeholder.com/300x180.png?text=Vanilla',
      price: 2.5,
      amount: 1,
      options: [
        { name: 'Chocolate syrup', price: 0.5, selected: false },
        { name: 'Nuts', price: 0.7, selected: false }
      ]
    },
    {
      name: 'Chocolate',
      description: 'Rich cocoa and cream flavor.',
      image: 'https://via.placeholder.com/300x180.png?text=Chocolate',
      price: 2.7,
      amount: 1,
      options: [
        { name: 'Jelly', price: 0.4, selected: false },
        { name: 'Coconut flakes', price: 0.6, selected: false }
      ]
    }
  ];

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  increment(item: any) {
    item.amount = (item.amount || 1) + 1;
  }

  decrement(item: any) {
    if (item.amount > 1) item.amount--;
  }

  addItem() {
    this.menu.push({
      name: 'New Flavor',
      description: 'Description of a new ice cream.',
      image: 'https://via.placeholder.com/300x180.png?text=New+Item',
      price: 3.0,
      amount: 1,
      options: []
    });
  }

  deleteItem(index: number) {
    this.menu.splice(index, 1);
  }

  addSingleItem(item: any) {
    const copy = JSON.parse(JSON.stringify(item));
    for (let i = 0; i < item.amount; i++) {
      this.store.addToCart(copy);
    }
  }
}
