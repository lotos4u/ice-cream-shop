import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'payment-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRadioModule, MatButtonModule],
  template: `
    <mat-card class="mat-elevation-z2">
      <mat-card-header>
        <mat-card-title>Payment</mat-card-title>
        <mat-card-subtitle>Select a payment method</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-radio-group>
          <mat-radio-button value="card">Credit Card</mat-radio-button><br />
          <mat-radio-button value="paypal">PayPal</mat-radio-button><br />
          <mat-radio-button value="cash">Cash</mat-radio-button>
        </mat-radio-group>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">Pay</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class Payment {}
