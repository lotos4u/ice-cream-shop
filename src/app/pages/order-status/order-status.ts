import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Статус заказа</h1>
    <p>Ваш заказ обрабатывается.</p>
  `
})
export class OrderStatus {}
