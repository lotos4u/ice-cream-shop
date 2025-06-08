import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import {MenuItem} from './menu-item/menu.item';
import {IMenuItem, IMenuOption} from '../../model';

@Component({
  selector: 'menu-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MenuItem
  ],
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  private store = inject(StoreService);
  private auth = inject(AuthService);

  selection = [];
  options: IMenuOption[] = [
    { id: 'kljlihliblasdjhfbgsalghgpd', name: 'Nuts', price: 0.5},
    { id: 'malkjnxasdkakasjnkjakvhshv', name: 'Jelly', price: 0.5},
    { id: 'slslsmdmfnfjvjcnsmsllxsdsd', name: 'Chocolate syrup', price: 0.5},
    { id: 'sdgdghkjhiojboijoijhjnknkj', name: 'Coconut flakes', price: 0.5},
  ];
  menu: IMenuItem[] = [
    {
      id: 'sdfsdfsdfsgbdbl;kdpokpooipo',
      name: 'Vanilla',
      description: 'Classic vanilla ice cream.',
      image: 'https://www.washingtonpost.com/resizer/qYpYDV1BjKI3ZimLblCjjFXhc2k=/arc-anglerfish-washpost-prod-washpost/public/KUFWIPXROII6ZLAWR67XDFGNPA.jpg',
      price: 2.0,
      // amount: 1,
      options: [
        this.options[0].id,
        this.options[1].id,
      ]
    },
    {
      id: 'sfdfdsgpjoijonjiciuahfivluh',
      name: 'Chocolate',
      description: 'Rich cocoa and cream flavor.',
      image: 'https://tarateaspoon.com/wp-content/uploads/2021/06/chocolate-ice-cream-cones-horiz.jpeg',
      price: 2.5,
      // amount: 1,
      options: [
        this.options[1].id,
        this.options[2].id,
      ]
    },
    {
      id: 'asdadaaaakzkkzkzkzjanaaakcd',
      name: 'Banana',
      description: 'Rich banana flavor.',
      image: 'https://www.acouplecooks.com/wp-content/uploads/2023/07/Banana-Ice-Cream-003.jpg',
      price: 2.5,
      // amount: 1,
      options: [
        this.options[2].id,
        this.options[3].id,
      ]
    },
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
      id: 'test',
      name: 'New Flavor',
      description: 'Description of a new ice cream.',
      image: 'https://via.placeholder.com/300x180.png?text=New+Item',
      price: 3.0,
      // amount: 1,
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
