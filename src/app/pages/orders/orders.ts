import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'orders',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="mat-elevation-z2">
      <mat-card-header>
        <mat-card-title>Orders</mat-card-title>
        <mat-card-subtitle>Current and past orders</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ul>
          <li>Order #123 - Processing</li>
          <li>Order #124 - Delivered</li>
          <li>Order #125 - Cancelled</li>
        </ul>
      </mat-card-content>
    </mat-card>
  `
})
export class Orders {
  isAdmin = true;
}
