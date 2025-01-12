import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {
    // console.log('AuthGuard executed');
    const loggedIn = this.authenticationService.isLoggedIn();
    // console.log('Is logged in:', loggedIn);

    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
