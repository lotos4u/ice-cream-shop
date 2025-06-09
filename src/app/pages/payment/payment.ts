import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {StoreService} from '../../services/store.service';
import {Router} from '@angular/router';
import {CURRENCY} from '../../services/data';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'payment-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRadioModule, MatButtonModule, MatIconModule],
  templateUrl: 'payment.html',
  styleUrls: ['payment.scss'],
})
export class Payment {
  store = inject(StoreService);
  router = inject(Router);
  protected readonly CURRENCY = CURRENCY;

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
