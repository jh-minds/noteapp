import { Component, OnInit } from '@angular/core';
import { LoginMainComponent } from './login-main/login-main.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../environments/environments.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LoginMainComponent, CommonModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'noteapp';
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to isAuthenticated$
    this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('isAuthenticated:', this.isAuthenticated);
      }
    );

    // Subscribe to user$
    this.auth.user$.subscribe(user => {
      if (user && user.email && user.name) {
        const email = user.email;
        const name = user.name;
        console.log('User data:', { email, name });
        this.sendUserData(email, name);
      } else {
        console.log('User data is incomplete:', user);
      }
    });
  }

  sendUserData(email: string, name: string) {
    const url = `${environment.apiUrl}/user`;
    const body = { email, name };
    console.log('Sending user data to URL:', url);
    console.log('Request body:', body);

    this.http.post(url, body).pipe(
      tap(response => {
        console.log('User data sent successfully:', response);
      }),
      catchError(error => {
        console.error('Error sending user data:', error);
        return of(null); // Return a fallback value or handle the error appropriately
      })
    ).subscribe();
  }
}