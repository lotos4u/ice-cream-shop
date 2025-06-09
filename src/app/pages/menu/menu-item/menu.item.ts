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

  selected: Partial<ISelectedItem>[] = [
    {
      options: [],
    }
  ];

  get allowedOptions(): IMenuOption[] {
    return !this.options || !this.item ? this.options : this.options.filter(o => this.item.options.includes(o.id));
  }

  counter(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1); // [1, 2, 3, ..., n]
  }

  getItemTotalPrice() {
    let optionsCost = 0;
    this.options.filter(option => {
      this.selected.forEach(s => {
        s.options?.forEach(selectedOption => {
          if (selectedOption === option.id) {
            optionsCost += option.price;
          }
        });
      });
    });
    return this.item.price * this.selected.length + optionsCost;
  }

  increment() {
    this.selected.push({options: []});
  }

  decrement() {
    if (this.selected.length > 1) {
      this.selected.pop();
    }
  }

  onOptionSelection(ind: number, optionId: string, status: boolean): void {
    if (status && !this.selected[ind].options?.includes(optionId)) {
      this.selected[ind].options?.push(optionId);
    }
    if (!status && this.selected[ind].options?.includes(optionId)) {
      this.selected[ind].options = this.selected[ind].options?.filter(o => o !== optionId);
    }
  }

  addSelectionToCart() {
    this.selected.forEach(s => {
      s.menuItemId = this.item.id;
    });
    const copy = JSON.parse(JSON.stringify(this.selected));
    this.store.addToCart(copy);
  }
}
