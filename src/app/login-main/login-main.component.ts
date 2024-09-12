import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogudComponent } from './logud/logud.component';
import { UserComponent } from './user/user.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [LoginComponent,LogudComponent,UserComponent,CommonModule],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.css'
})
export class LoginMainComponent {
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
  }
}
