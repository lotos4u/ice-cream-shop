import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'inventory',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="mat-elevation-z2">
      <mat-card-header>
        <mat-card-title>Inventory</mat-card-title>
        <mat-card-subtitle>For authorized users only</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ul>
          <li>Vanilla - 20 pcs</li>
          <li>Chocolate - 15 pcs</li>
          <li>Strawberry - 10 pcs</li>
        </ul>
      </mat-card-content>
    </mat-card>
  `
})
export class Inventory {
}
