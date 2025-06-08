import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {IMenuItem, IMenuOption, ISelectedItem} from '../../../model';
import {StoreService} from '../../../services/store.service';


@Component({
  selector: 'menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: 'menu.item.html',
  styleUrls: ['menu.item.scss'],
})
export class MenuItem {
  private store = inject(StoreService);

  @Input()
  item!: IMenuItem;

  @Input()
  options!: IMenuOption[];

  selected: ISelectedItem = {
    amount: 1,
    options: [],
  };

  get allowedOptions(): IMenuOption[] {
    return !this.options || !this.item ? this.options : this.options.filter(o => this.item.options.includes(o.id));
  }

  increment(item: any) {
    this.selected.amount = (this.selected.amount || 1) + 1;
  }

  decrement(item: any) {
    if (this.selected.amount > 1) this.selected.amount--;
  }

  onOptionSelection(optionId: string, status: boolean): void {
    if (status && !this.selected.options.includes(optionId)) {
      this.selected.options.push(optionId);
    }
    if (!status && this.selected.options.includes(optionId)) {
      this.selected.options = this.selected.options.filter(o => o !== optionId);
    }
  }

  addSingleItem(item: any) {
    const copy = JSON.parse(JSON.stringify(item));
    for (let i = 0; i < item.amount; i++) {
      this.store.addToCart(copy);
    }
  }
}
