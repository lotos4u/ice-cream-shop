import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { StoreService } from '../../services/store.service';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
  ],
  template: `
    <h1>Welcome to Ice Cream Cafe!</h1>
    <div class="menu-container">
      <mat-card *ngFor="let item of menu" class="menu-card mat-elevation-z4">
        <img mat-card-image [src]="item.image" alt="{{ item.name }}">
        <mat-card-title>{{ item.name }}</mat-card-title>
        <mat-card-subtitle>{{ item.description }}</mat-card-subtitle>
        <mat-card-content>
          <mat-checkbox [(ngModel)]="item.selected">
            Add ({{ item.price }} €)
          </mat-checkbox>

          <div *ngIf="item.selected" class="options">
            <p>Опции:</p>
            <mat-checkbox *ngFor="let opt of item.options" [(ngModel)]="opt.selected">
              {{ opt.name }}
            </mat-checkbox>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="actions">
      <button mat-raised-button color="primary" (click)="addToCart()">Add to cart</button>

      <div *ngIf="isAdmin" class="admin-controls">
        <h3>Edit menu</h3>
        <button mat-button (click)="addItem()">Add item</button>
      </div>
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
      object-fit: cover;
    }
    .options {
      margin-top: 10px;
    }
    .actions {
      margin-top: 30px;
    }
    .admin-controls {
      margin-top: 20px;
    }
    `
  ]
})
export class Menu {
  isAdmin = true;
  menu = [
    {
      name: 'Vanilla',
      description: 'Classic vanilla ice cream',
      image: 'https://via.placeholder.com/300x180.png?text=Vanilla',
      price: 2.5,
      selected: false,
      options: [
        { name: 'Chocolate syrup', selected: false },
        { name: 'Nuts', selected: false }
      ]
    },
    {
      name: 'Chocolate',
      description: 'Cocoa',
      image: 'https://via.placeholder.com/300x180.png?text=Chocolate',
      price: 2.7,
      selected: false,
      options: [
        { name: 'Marmelade', selected: false },
        { name: 'Coconut', selected: false }
      ]
    }
  ];

  constructor(private store: StoreService) {}

  addItem() {
    this.menu.push({
      name: 'Ice cream name',
      description: 'New description',
      image: 'https://via.placeholder.com/300x180.png?text=New+Item',
      price: 3.0,
      selected: false,
      options: [],
    });
  }

  addToCart() {
    for (const item of this.menu) {
      if (item.selected) {
        const copy = JSON.parse(JSON.stringify(item));
        this.store.addToCart(copy);
      }
    }
  }
}
