import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Заказы</h1>
    <p *ngIf="isAdmin">Просмотр текущих заказов и их статусов.</p>
    <ul>
      <li>Заказ #123 - В процессе</li>
      <li>Заказ #124 - Доставлен</li>
      <li>Заказ #125 - Отменен</li>
    </ul>
  `
})
export class Orders {
  isAdmin = true;
}
