import {Component, effect} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {EOrderStatus, StoreService} from './services/store.service';
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
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
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
    this.store.setOrderStatus(EOrderStatus.empty);
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/menu']);
  }
}
