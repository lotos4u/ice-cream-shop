import {Injectable, signal, WritableSignal, Provider, inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor() {
    const stored = localStorage.getItem('loggedIn');
    if (stored === 'true') {
      this.isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): boolean {
    const valid = username === '1' && password === '1';
    this.isAuthenticated.set(valid);
    localStorage.setItem('loggedIn', valid ? 'true' : 'false');
    return valid;
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export function provideAuth(): Provider[] {
  return [AuthService];
}
