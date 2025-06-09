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
  public store = inject(StoreService);
  private auth = inject(AuthService);

  selection = [];

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
    // this.menu.push({
    //   id: 'test',
    //   name: 'New Flavor',
    //   description: 'Description of a new ice cream.',
    //   image: 'https://via.placeholder.com/300x180.png?text=New+Item',
    //   price: 3.0,
    //   // amount: 1,
    //   options: []
    // });
  }

  deleteItem(index: number) {
    // this.menu.splice(index, 1);
  }

  addSingleItem(item: any) {
    const copy = JSON.parse(JSON.stringify(item));
    for (let i = 0; i < item.amount; i++) {
      this.store.addToCart(copy);
    }
  }
}
