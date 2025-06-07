import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inventory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Остатки на складе</h1>
    <p *ngIf="isAdmin">Только для авторизованных пользователей.</p>
    <ul>
      <li>Ванильное - 20 шт</li>
      <li>Шоколадное - 15 шт</li>
      <li>Клубничное - 10 шт</li>
    </ul>
  `
})
export class Inventory {
  isAdmin = true;
}
