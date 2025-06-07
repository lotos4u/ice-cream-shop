import {Component, effect} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {StoreService} from './services/store.service';
import {filter} from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatMenuModule, RouterModule, RouterOutlet, MatIconModule, MatToolbarModule, MatSelectModule, FormsModule, MatButtonModule,],
  template: `
    <mat-toolbar color="primary" class="toolbar" *ngIf="!isLoginPage">
      <span class="title" (click)="home()">🍦 Ice Cream Shop</span>

      <div class="toolbar-content">
        <button mat-button [matMenuTriggerFor]="langMenu">
          {{ selectedLang }} <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #langMenu="matMenu">
          <button mat-menu-item *ngFor="let lang of languages" (click)="selectLanguage(lang)">{{ lang }}</button>
        </mat-menu>

        <button mat-button [routerLink]="linkTarget">
          <mat-icon>shopping_cart</mat-icon>
          <span *ngIf="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          {{ store.getOrderStatus() === 'Confirmed' ? 'Order Status' : 'Cart' }}
        </button>

        <button *ngIf="auth.isLoggedIn()" mat-button (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      menu {
        padding: 1rem;
        margin: 0;
      }

      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
      }

      .toolbar-content {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .title {
        font-weight: bold;
        font-size: 18px;
        color: white;
        cursor: pointer;
      }

      .language {
        width: 100px;
      }

      .language .mat-form-field-infix {
        //color: white;
      }

      .language .mat-select-value-text {
        //color: white !important;
      }

      .cart-badge {
        background-color: #fff;
        color: #1976d2;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        margin-left: 4px;
      }
    `
  ],
})
export class AppComponent {
  selectedLang = 'EN';
  languages = ['EN', 'DE',];
  isLoginPage = false;
  linkTarget = '/cart';
  cartCount = 0;

  constructor(public auth: AuthService,
              public store: StoreService,
              private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isLoginPage = router.url.includes('login');
      this.linkTarget = store.getOrderStatus() === 'Confirmed' ? '/order-status' : '/cart';
      this.cartCount = store.getCart().length;
    });

    effect(() => {
      this.cartCount = this.store.cart().length;
    });
  }

  selectLanguage(lang: string) {
    this.selectedLang = lang;
  }

  logout() {
    this.auth.logout();
    this.store.clearCart();
    this.store.setOrderStatus('Pending');
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/menu']);
  }
}
