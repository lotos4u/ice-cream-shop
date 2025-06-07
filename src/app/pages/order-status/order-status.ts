import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'order-status',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="mat-elevation-z2">
      <mat-card-header>
        <mat-card-title>Order Status</mat-card-title>
        <mat-card-subtitle>Track your order</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Your order is being processed.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class OrderStatus {}
