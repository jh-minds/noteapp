import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-logud',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './logud.component.html',
  styleUrl: './logud.component.css'
})
export class LogudComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService
  ) {}

  logud() {
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });
  }
}
