import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Оплата</h1>
    <p>Выберите способ оплаты:</p>
    <ul>
      <li><input type="radio" name="payment" value="card"> Банковская карта</li>
      <li><input type="radio" name="payment" value="paypal"> PayPal</li>
    </ul>
    <button>Подтвердить оплату</button>
  `
})
export class Payment {}
