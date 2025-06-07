import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="login-card">
      <mat-card-header>
        <mat-card-title>Ice Cream Shop</mat-card-title>
        <mat-card-subtitle>Owner's area</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onLogin()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Login</mat-label>
            <input matInput [(ngModel)]="username" name="username">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password">
          </mat-form-field>

          <button mat-raised-button color="primary">Enter</button>
        </form>
      </mat-card-content>
      <mat-card-footer>
        <p *ngIf="loginFailed" style="color: red">Wrong credentials!</p>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
    .login-card {
      max-width: 400px;
      margin: 40px auto;
      padding: 20px;
    }
    .full-width {
      width: 100%;
    }
    `
  ]
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  loginFailed = false;

  onLogin() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigateByUrl('/menu');
    } else {
      this.loginFailed = true;
    }
  }
}
